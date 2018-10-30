const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require('../../src/db/models').Post;
const User = require('../../src/db/models').User;
const { Console } = require('console');

describe('Topic', () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((res) => {
      User.create({
        email: "user@email.com",
        password: "1234567"
      })
      .then((user) => {
      this.user = user;

      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "Reports from a visit to the stars",
        posts: [{
          title: 'Day 1: Leaving Earth',
          body: "I saw some rocks",
          userId: this.user.id
        }]
      }, {
        include: {
          model: Post,
          as: "posts"
        }
      })
      .then((topic) => {
        this.topic = topic;
        this.post = topic.posts[0];
        done();
      });
    });
  });
});
  describe('#create()', () => {
    it('should create a topic with a title and description', (done) => {
      Topic.create({
        title: 'Living on Battlestar Galactica',
        description: 'It was rough'
      })
      .then((topic) => {
        expect(topic.title).toBe('Living on Battlestar Galactica');
        expect(topic.description).toBe('It was rough');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });
  describe('#getPosts()', () => {
    it('should return associated posts', (done) => {
      this.topic.getPosts()
      .then((posts) => {
        for(let i = 0; i < posts.length; i++) {
          expect(posts[i].title).toBe('Day 1: Leaving Earth');
          done();
        }
      });
    });
  });


});
