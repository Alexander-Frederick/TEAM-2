const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testDatabase() {
  // Query professors
  const professors = await prisma.professor.findMany();
  console.log('Professors:', professors);

  // Query tutors
  const tutors = await prisma.tutor.findMany();
  console.log('Tutors:', tutors);

  // Query students
  const students = await prisma.student.findMany();
  console.log('Students:', students);

  // Query classes with their relationships
  const classes = await prisma.class.findMany({
    include: {
      professors: true,
      tutors: true,
      sessions: true
    }
  });
  console.log('Classes:', classes);

  // Query study sessions with relationships
  const studySessions = await prisma.studySession.findMany({
    include: {
      tutor: true,
      class: true
    }
  });
  console.log('Study Sessions:', studySessions);

  // Query feedback with relationships
  const feedback = await prisma.feedback.findMany({
    include: {
      student: true,
      professor: true,
      tutor: true
    }
  });
  console.log('Feedback:', feedback);
}

testDatabase()
  .catch((error) => {
    console.error('Error querying database:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });