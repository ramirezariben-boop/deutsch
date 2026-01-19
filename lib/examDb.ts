import { Pool } from "pg";

if (!process.env.EXAM_DATABASE_URL) {
  throw new Error("EXAM_DATABASE_URL no está definido en .env");
}

const pool = new Pool({
  connectionString: process.env.EXAM_DATABASE_URL,
});

export async function getExamByStudent(studentId: number) {
  const res = await pool.query(
    `SELECT * FROM "WritingExam" WHERE "studentId" = $1 LIMIT 1`,
    [studentId]
  );
  return res.rows[0] || null;
}

export async function createExam(studentId: number, text: string) {
  const res = await pool.query(
    `INSERT INTO "WritingExam" ("studentId", "text") VALUES ($1, $2)
     RETURNING *`,
    [studentId, text]
  );
  return res.rows[0];
}

export async function getAllExams() {
  const res = await pool.query(
    `SELECT * FROM "WritingExam" ORDER BY "createdAt" DESC`
  );
  return res.rows;
}
