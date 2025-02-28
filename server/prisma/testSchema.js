const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testDatabase() {
  // Query users by role
  console.log('\n--- Users by Role ---');
  const professors = await prisma.user.findMany({
    where: {
      role: 'PROFESSOR'
    },
    include: {
      professorClasses: true,
      professorFeedback: {
        include: {
          fromStudent: true,
          fromTutor: true
        }
      }
    }
  });
  
  console.log('Professors:', professors.length);
  professors.forEach(p => {
    console.log(`\nPROFESSOR DETAILS:`);
    console.log(`ID: ${p.id}`);
    console.log(`Name: ${p.name}`);
    console.log(`Email: ${p.email}`);
    console.log(`Phone: ${p.phoneNumber || 'Not provided'}`);
    
    console.log(`Classes Taught (${p.professorClasses.length}):`);
    p.professorClasses.forEach(cls => {
      console.log(`  - ${cls.courseCode}: ${cls.name}`);
    });
    
    console.log(`Feedback Received (${p.professorFeedback.length}):`);
    p.professorFeedback.forEach(fb => {
      const fromName = fb.fromStudent ? fb.fromStudent.name : 
                      (fb.fromTutor ? fb.fromTutor.name : "Unknown");
      const fromType = fb.fromStudent ? "Student" : 
                      (fb.fromTutor ? "Tutor" : "Unknown");
      console.log(`  - From ${fromType} ${fromName}: "${fb.feedback}"`);
    });
    console.log('-'.repeat(50));
  });

  const tutors = await prisma.user.findMany({
    where: {
      role: 'TUTOR'
    }
  });
  console.log('\nTutors:', tutors.length);
  tutors.forEach(t => console.log(`- ${t.name} (${t.email})`));

  const students = await prisma.user.findMany({
    where: {
      role: 'STUDENT'
    }
  });
  console.log('\nStudents:', students.length);
  students.forEach(s => console.log(`- ${s.name} (${s.email})`));

  // Query classes with their relationships
  console.log('\n--- Classes with Relations ---');
  const classes = await prisma.class.findMany({
    include: {
      professors: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      tutors: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      sessions: true
    }
  });
  
  for (const cls of classes) {
    console.log(`\nClass: ${cls.name} (${cls.courseCode})`);
    console.log(`Professors (${cls.professors.length}):`);
    cls.professors.forEach(p => console.log(`- ${p.name}`));
    console.log(`Tutors (${cls.tutors.length}):`);
    cls.tutors.forEach(t => console.log(`- ${t.name}`));
  }

  // Query study sessions with relationships
  console.log('\n--- Study Sessions ---');
  const studySessions = await prisma.studySession.findMany({
    include: {
      tutor: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      class: true
    }
  });
  
  for (const session of studySessions) {
    console.log(`Session #${session.sessionId} for ${session.class.courseCode}`);
    console.log(`Tutor: ${session.tutor.name}`);
    console.log(`Location: ${session.location}`);
    console.log(`Time: ${session.time}`);
  }

  // Query feedback with relationships
  console.log('\n--- Feedback ---');
  const feedback = await prisma.feedback.findMany({
    include: {
      fromStudent: {
        select: {
          id: true,
          name: true,
          role: true
        }
      },
      fromTutor: {
        select: {
          id: true,
          name: true,
          role: true
        }
      },
      professor: {
        select: {
          id: true,
          name: true,
          role: true
        }
      },
      tutor: {
        select: {
          id: true,
          name: true,
          role: true
        }
      },
      class: true
    }
  });
  
  for (const fb of feedback) {
    console.log(`\nFeedback #${fb.feedbackId} for ${fb.class.courseCode}`);
    console.log(`Date: ${fb.createdAt}`);
    
    // Who gave the feedback
    if (fb.fromStudent) {
      console.log(`From Student: ${fb.fromStudent.name}`);
    } else if (fb.fromTutor) {
      console.log(`From Tutor: ${fb.fromTutor.name}`);
    }
    
    // Who received the feedback
    if (fb.professor) {
      console.log(`To Professor: ${fb.professor.name}`);
    } else if (fb.tutor) {
      console.log(`To Tutor: ${fb.tutor.name}`);
    }
    
    console.log(`Feedback: "${fb.feedback}"`);
  }
  
  // Special query for tutor-to-professor feedback
  console.log('\n--- Tutor to Professor Feedback ---');
  const tutorToProfessorFeedback = await prisma.feedback.findMany({
    where: {
      fromTutorId: { not: null },
      professorId: { not: null }
    },
    include: {
      fromTutor: true,
      professor: true,
      class: true
    }
  });
  
  for (const fb of tutorToProfessorFeedback) {
    console.log(`\nTutor ${fb.fromTutor.name} to Professor ${fb.professor.name} (${fb.class.courseCode}):`);
    console.log(`"${fb.feedback}"`);
  }
}

testDatabase()
  .catch((error) => {
    console.error('Error querying database:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });