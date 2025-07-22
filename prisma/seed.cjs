const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');


async function main() {

  await prisma.text.createMany({
    data: [
      {
        name: "about_message_1",
        type: "about",
        message: "Based in Bountiful, Utah, Lisa is a foundational figure in the studio, bringing over two decades of dedicated experience and a genuine passion for introducing the joy of piano to young learners. Her lifelong connection with the piano began in her own childhood, where she built a strong musical foundation through extensive lessons and study with talented professional instructors. This rich history and love for the instrument inspire her work teacahing musical talent to the next generation",
      },
      {
        name: "about_message_2",
        type: "about",
        message: "At Lisa Miller Piano Studio, the primary focus is on fostering a positive and encouraging environment where young learners can develop a deep love for music and unlock their creativity. Private lessons, tailored to each student's pace and goals, are typically 30 to 45 minutes in length and are scheduled once or twice per week.",
      },
      {
        name: "about_message_3",
        type: "about",
        message: "In addition to individual instruction, group classes are held periodically, often before recitals, to build ensemble skills and confidence. Students also have the option to participate in events such as the Federation piano competition for performance and evaluation opportunities.",
      },
      {
        name: "header_message_title",
        type: "header",
        message: "Lisa Miller Piano Studio"
      },
      {
        name: "header_message_subtitle",
        type: "header",
        message: "Welcome to your studio home base!"
      },
      {
        name: "header_message_about",
        type: "header",
        message: "Check here for scheduling purposes, recital info, and links to resources you will use throughout the year."
      },
      {
        name: "contact_about",
        type: "contact",
        message: "Have questions about lessons, availability, or anything else regarding the studio? Please feel free to reach out using the contact methods below. We look forward to hearing from you!"
      },
      {
        name: "contact_email",
        type: "contact",
        message: "pianomom.2025@gmail.com"
      },
      {
        name: "home_about",
        type: "home",
        message: "An Uplifting Space to Learn, Create, and Grow Through Music"
      },
      {
        name: "home_contact",
        type: "home",
        message: "Reach Out to Ask About Lessons, Availability, or Any Other Questions"
      },
      {
        name: "home_schedule",
        type: "home",
        message: "View the Current Lesson and Group Class Schedule"
      },
    ],
  });

  await prisma.user.upsert({
  where: {
    id: 1,
  },
  create: {
    name: process.env.ADMIN_EMAIL,
    email: process.env.ADMIN_EMAIL, // required if your schema uses unique email
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
    role: "admin", // assuming your schema has a role field (e.g., 'user', 'admin')
  },
  update: {
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
    role: "admin", // optional but good to include
  }
});

  console.log('Seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
