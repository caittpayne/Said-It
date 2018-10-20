const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require('../../src/db/models').Post;
const { Console } = require('console');

describe('Topic', () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: 'Trip to Mars',
        description: 'A diary of a trip to Mars'
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: 'Day 1: Leaving Earth',
          body: 'I was very excited',
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
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
