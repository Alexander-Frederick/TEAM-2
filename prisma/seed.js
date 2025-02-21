const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetSequences() {
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0;`;
}

async function seedDatabase() {
  console.log('Cleaning database...');
  // Clean the database
  await prisma.$transaction([
    prisma.feedback.deleteMany(),
    prisma.studySession.deleteMany(),
    prisma.class.deleteMany(),
    prisma.student.deleteMany(),
    prisma.tutor.deleteMany(),
    prisma.professor.deleteMany(),
  ]);

  // Reset all sequences to 0
  await resetSequences();
  console.log('Reset sequences...');

  console.log('Creating professors...');
  const professor1 = await prisma.professor.create({
    data: {
      email: 'smith@university.edu',
      name: 'Dr. Smith',
      phoneNumber: '555-0100'
    }
  });
  console.log(`Created professor: ${professor1.name} with ID: ${professor1.professorId}`);

  const professor2 = await prisma.professor.create({
    data: {
      email: 'jones@university.edu',
      name: 'Dr. Jones',
      phoneNumber: '555-0101'
    }
  });
  console.log(`Created professor: ${professor2.name} with ID: ${professor2.professorId}`);

  console.log('Creating tutor...');
  const tutor = await prisma.tutor.create({
    data: {
      email: 'tutor@university.edu',
      name: 'Jane Doe',
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
  console.log(`Created tutor: ${tutor.name} with ID: ${tutor.tutorId}`);

  console.log('Creating student...');
  const student = await prisma.student.create({
    data: {
      email: 'student@university.edu',
      name: 'John Student'
    }
  });
  console.log(`Created student: ${student.name} with ID: ${student.studentId}`);

  console.log('Creating classes...');
  const cs101 = await prisma.class.create({
    data: {
      courseCode: 'CS101',
      name: 'Introduction to Computer Science',
      professors: {
        connect: [{ professorId: professor1.professorId }, { professorId: professor2.professorId }]
      },
      tutors: {
        connect: [{ tutorId: tutor.tutorId }]
      }
    }
  });
  console.log(`Created class: ${cs101.name} with ID: ${cs101.classId}`);

  const cs102 = await prisma.class.create({
    data: {
      courseCode: 'CS102',
      name: 'Data Structures',
      professors: {
        connect: [{ professorId: professor1.professorId }]
      },
      tutors: {
        connect: [{ tutorId: tutor.tutorId }]
      }
    }
  });
  console.log(`Created class: ${cs102.name} with ID: ${cs102.classId}`);

  console.log('Creating study session...');
  const studySession = await prisma.studySession.create({
    data: {
      tutorId: tutor.tutorId,
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
  const professorFeedback = await prisma.feedback.create({
    data: {
      studentId: student.studentId,
      professorId: professor1.professorId,
      classCode: 'CS101',
      feedback: "Great professor, very clear explanations"
    }
  });
  console.log(`Created professor feedback with ID: ${professorFeedback.feedbackId}`);

  const tutorFeedback = await prisma.feedback.create({
    data: {
      studentId: student.studentId,
      tutorId: tutor.tutorId,
      classCode: 'CS101',
      feedback: "Very helpful tutor session"
    }
  });
  console.log(`Created tutor feedback with ID: ${tutorFeedback.feedbackId}`);
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