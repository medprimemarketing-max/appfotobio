import pool from "../src/db";

const emails = process.argv.slice(2);

if (emails.length === 0) {
  console.error("Usage: npx ts-node scripts/make-admin.ts email1 email2 ...");
  process.exit(1);
}

async function main() {
  const result = await pool.query(
    `UPDATE app_users SET role = 'admin', updated_at = NOW()
     WHERE email = ANY($1) AND is_active = true
     RETURNING email, role`,
    [emails]
  );

  if (result.rows.length === 0) {
    console.error("No matching active users found for:", emails);
  } else {
    for (const row of result.rows) {
      console.log(`${row.email} -> role: ${row.role}`);
    }
  }

  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
