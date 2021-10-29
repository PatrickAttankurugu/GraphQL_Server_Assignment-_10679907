const { ApolloServer, gql } = require("apollo-server");

const port = process.env.PORT || 7001;

const blogs = [
  {
    author: "Patrick Attankurugu",
    aboutAuthor: "Software Engineer",
    title: " A Brave New World",
    description:"It's a daring world, and we must step into it with boldness"

    date: "10th September,2021",
    likes: 192,
  },

  {
    author: "Michael Ayensokia",
    aboutAuthor: "Law student of Havard",
    title: "My first experience in Law School",
    description:
      "We must change this. As Christ followers, we must go the extra mile, turn the other cheek, and listen and serve others. Even if others wrong us, we must not further the conflict, but seek to end it. We MUST grow out of our old ways and move into our more advanced Christian faith, which calls for serving others and not ourselves. we should not hold grudges, rather we should forgive, even if we don't forget what harmed us. We need to be bigger than a political party, a hateful person, or sinful activity. Only then can we truly consider ourselves Children of God, and only then can we be mentally HEALTHY and spiritually right. By his grace and mercy he has saved us, now we must help others to experience the same.",
    date: "2nd March,2021",
    likes: 73,
  },

  {
    author: "Ernest Gaisie",
    aboutAuthor: "Co-Founder of Trustur",
    title: "My first experience in Law School",
    description:
      "We must change this. As Christ followers, we must go the extra mile, turn the other cheek, and listen and serve others. Even if others wrong us, we must not further the conflict, but seek to end it. We MUST grow out of our old ways and move into our more advanced Christian faith, which calls for serving others and not ourselves. we should not hold grudges, rather we should forgive, even if we don't forget what harmed us. We need to be bigger than a political party, a hateful person, or sinful activity. Only then can we truly consider ourselves Children of God, and only then can we be mentally HEALTHY and spiritually right. By his grace and mercy he has saved us, now we must help others to experience the same.",
    date: "28th September,2021",
    likes: 120,
  },

  {
    author: "Kingsley A. Tawiah",
    aboutAuthor: "Gamer at Activision",
    title: "Earning CPs easily",
    description:
      "Church isn't needed to communicate with God, but what it does service as is a place for fellow believers to have community, where iron can sharpen iron, and were faith can grow. In tough times we are meant to be together, called to help others, and needed to bring comfort to others. yet throughout most of 2020, our churches were closed to the public, and most importantly, far away from our hearts and minds.",
    date: "29th October,2021",
    likes: 110,
  },

  {
    author: "WAAB",
    aboutAuthor: "A multi-billionaire business man",
    title: "How to sell cow efficiently",
    description:
      "We were not able to put away these many differences, and so, it cost us dearly. Another year of our lives away from family, another year of wasted time for (most) of us not to achieve our goals, and most shockingly, another year with a strange relationship between Christians and the church.",
    date: "17th June,2021",
    likes: 123,
  },

  {
    author: "Derrick Pennel",
    aboutAuthor: "CEO of DFP",
    title: "Best Experiences with Afluent Friends",
    description:
      "Divide and conquer... We hear it all the time, usually in reference on how to work more efficiently to complete a task. There is power in doing so. So, why do we allow Satan to do this very thing to us? We let him divide the kingdom, propping believer against believer, sect against sect, and denomination against denomination. We now HATE others based on what political stance they have, traditions they practice, and what race they we born into. Ironically, each side of the spectrum claims that the other side is the author of these evils, that vandalism only comes from liberals Uneducated and stupid.",
    date: "12th October,2021",
    likes: 109,
  },

  {
    author: "Peter Mensah",
    aboutAuthor: "Drug dealer",
    title: "Why A students work for C students",
    description: " It is shocking to know that in most cases, A students do not always end up at the top in the real world. A students mostly end up working for their counterparts who didn't do well in school. The difference lie in how they spent their time during their school days"
    date: "20th October,2021",
    likes: 220,
  },

  {
    author: "Marcus Rashford",
    aboutAuthor: "Forward at Manchester United",
    title: "How to score more goals",
    description:
      "Even God rested after creating the Earth. He may or may not have been tired(God has no limits) however, he still rested. Why was the case? Most likely because he wanted to show his followers how to properly recharge, and to take the Sabbath to worship him. Needless to say, we need to rest, at least on the Sabbath, if not more.",
    date: "7th December,2021",
    likes: 88,
  },

  {
    author: "Abel Tesfaye",
    aboutAuthor: "R&B Musician",
    title: "Ordinary Life",
    description:
      "In my years of experience as a Christian I have seen God show up in many ways, sometimes (mostly) unexpectedly. He can show up during a prayer, a song at church, a night of conversation with friends, or through random acts of kindness. He is not limited to any aspect of life, so he can show up as he pleases.",
    date: "5th May,2021",
    likes: 1000,
  },

  {
    author: "Marshmellow",
    aboutAuthor: "Mute Singer",
    title: "Creating Beats in the industry",
    description:
      "Being inspired by the beauty of it, and the accomplishments and exploration of man, the crew of Apollo 8 were overjoyed and inspired by their trip. They decided to share this celebration with the world. Maybe it was the Christmas Spirit, maybe it was a coincidence, or maybe God planned for this all along but what happened next became some of the most famous moments in Broadcast TV history, and at that point, the most watched broadcast in the History of the World.",
    date: "1st February,2021",
    likes: 97,
  },
];

//Creating the Schema
const schemas = gql`
  type Blog {
    author: String!
    aboutAuthor: String!
    title: String!
    description: String!
    date: String!
    likes: Int
  }

  type Query {
    blogs: [Blog]
    blog(title: String!): Blog
  }

  type Mutation {
    createBlog(
      title: String!
      author: String!
      aboutAuthor: String!
      description: String!
      date: String!
      likes: Int
    ): Blog
  }
`;

//Creating the Resolvers
const blogResolvers = {
  Query: {
    blogs: () => blogs,
    blog: (parent, args) => blogs.find((blog) => blog.title === args.title),
  },

  Mutation: {
    createBlog: (parent, args) => {
      const { title, likes, author, aboutAuthor, description, date } = args;
      const blog = { title, likes, author, aboutAuthor, description, date };
      blogs.push(blog);
      return blog;
    },
  },
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers: blogResolvers,
  playground: true,
  introspection: true,
});

server
  .listen(port)
  .then(({ url }) => {
    console.log(`Server ready at ${url} and ready to be used`);
  })
  .catch((err) => console.log(err));
