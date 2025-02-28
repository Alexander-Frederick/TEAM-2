const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function resetSequences() {
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0;`;
}

async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function seedDatabase() {
  console.log('Cleaning database...');
  // Clean the database
  await prisma.$transaction([
    prisma.feedback.deleteMany(),
    prisma.studySession.deleteMany(),
    prisma.class.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Reset all sequences to 0
  await resetSequences();
  console.log('Reset sequences...');

  // Default password for test accounts
  const defaultPassword = await hashPassword('password123');

  console.log('Creating users...');
  
  // Create Professor 1
  const professor1 = await prisma.user.create({
    data: {
      email: 'smith@university.edu',
      password: defaultPassword,
      name: 'Dr. Smith',
      phoneNumber: '555-0100',
      role: 'PROFESSOR'
    }
  });
  console.log(`Created professor: ${professor1.name} with ID: ${professor1.id}`);

  // Create Professor 2
  const professor2 = await prisma.user.create({
    data: {
      email: 'jones@university.edu',
      password: defaultPassword,
      name: 'Dr. Jones',
      phoneNumber: '555-0101',
      role: 'PROFESSOR'
    }
  });
  console.log(`Created professor: ${professor2.name} with ID: ${professor2.id}`);

  // Create Tutor
  const tutor = await prisma.user.create({
    data: {
      email: 'tutor@university.edu',
      password: defaultPassword,
      name: 'Jane Doe',
      role: 'TUTOR',
      availability: JSON.stringify({
        monday: [
          { start: "16:00", end: "18:00" },
          { start: "19:00", end: "21:00" }
        ],
        wednesday: [
          { start: "15:00", end: "17:00" }
        ]
      })
    }
  });
  console.log(`Created tutor: ${tutor.name} with ID: ${tutor.id}`);

  // Create Student
  const student = await prisma.user.create({
    data: {
      email: 'student@university.edu',
      password: defaultPassword,
      name: 'John Student',
      role: 'STUDENT'
    }
  });
  console.log(`Created student: ${student.name} with ID: ${student.id}`);

  console.log('Creating classes...');
  const cs101 = await prisma.class.create({
    data: {
      courseCode: 'CS101',
      name: 'Introduction to Computer Science',
      professors: {
        connect: [
          { id: professor1.id }, 
          { id: professor2.id }
        ]
      },
      tutors: {
        connect: [
          { id: tutor.id }
        ]
      }
    }
  });
  console.log(`Created class: ${cs101.name} with ID: ${cs101.classId}`);

  const cs102 = await prisma.class.create({
    data: {
      courseCode: 'CS102',
      name: 'Data Structures',
      professors: {
        connect: [{ id: professor1.id }]
      },
      tutors: {
        connect: [{ id: tutor.id }]
      }
    }
  });
  console.log(`Created class: ${cs102.name} with ID: ${cs102.classId}`);

  console.log('Creating study session...');
  const studySession = await prisma.studySession.create({
    data: {
      tutorId: tutor.id,
      classCode: 'CS101',
      location: 'Library Room 101',
      time: JSON.stringify({
        monday: [
          { start: "16:00", end: "18:00" }
        ]
      })
    }
  });
  console.log(`Created study session with ID: ${studySession.sessionId}`);

  console.log('Creating feedback...');
  const studentToProfessorFeedback = await prisma.feedback.create({
    data: {
      fromStudentId: student.id,
      professorId: professor1.id,
      classCode: 'CS101',
      feedback: "Great professor, very clear explanations"
    }
  });
  console.log(`Created student to professor feedback with ID: ${studentToProfessorFeedback.feedbackId}`);

  const studentToTutorFeedback = await prisma.feedback.create({
    data: {
      fromStudentId: student.id,
      tutorId: tutor.id,
      classCode: 'CS101',
      feedback: "Very helpful tutor session"
    }
  });
  console.log(`Created student to tutor feedback with ID: ${studentToTutorFeedback.feedbackId}`);
  
  // Tutor giving feedback to professor
  const tutorToProfessorFeedback = await prisma.feedback.create({
    data: {
      fromTutorId: tutor.id,
      professorId: professor1.id,
      classCode: 'CS101',
      feedback: "Students are responding well to your teaching methods. The study group had some questions about the last assignment that I tried to clarify."
    }
  });
  console.log(`Created tutor to professor feedback with ID: ${tutorToProfessorFeedback.feedbackId}`);
}

seedDatabase()
  .then(() => {
    console.log('Database seeded successfully');
  })
  .catch((error) => {
    console.error('Error seeding database:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });