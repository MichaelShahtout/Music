const { prisma } = require('./generated/prisma-client')
 
// A `main` function so that we can use async/await
async function main() {
  // Create a new user with a new post
  const newUser = await prisma.createUser({
    name: 'USERNAME',
    posts: {
      create: { title: 'POSTS' }
    }
  })
  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)
 
  // Read all users from the database and print them to the console
  const allUsers = await prisma.users()
  console.log(allUsers)
 
  // Read all posts from the database and print them to the console
  const allPosts = await prisma.posts()
  console.log(allPosts)

  const usersCalledAlice = await prisma
  .users({
    where: {
      name: "USER"
    }
  })

  // replace the __USER_ID__ placeholder with an actual user ID
const updatedUser = await prisma
  .updateUser({
    where: { id: "__USER_ID__" },
    data: { email: "placeholder@prisma.io" }
  })


  // replace the __USER_ID__ placeholder with an actual user ID
 const deletedUser = await prisma
  .deleteUser({ id: "__USER_ID__" })


  const postsByAuthor = await prisma
  .user({ email: "placeholder@prisma.io" })
  .posts()
}
 
main().catch(e => console.error(e))n
