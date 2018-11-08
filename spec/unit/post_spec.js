const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require('../../src/db/models').Post;
const User = require('../../src/db/models').User;
const Vote = require('../../src/db/models').Vote;
const { Console } = require('console');

describe('Post', () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;
    this.vote;

    sequelize.sync({force: true}).then((res) => {
      User.create({
        email: "user@email.com",
        password: "123456"
      })
      .then((user) => {
        this.user = user;

        Topic.create({
          title: 'Expeditions to Alpha Centauri',
          description: 'A journey to the stars',
          posts: [{
            title: 'My first visit to Proxima Centauri b',
            body: 'I saw some rocks',
            userId: this.user.id
          }]
        }, {
          include: {
            model: Post,
            as: 'posts'
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
    it('should create a post object with a title, body, and assigned topic and user', (done) => {
      Post.create({
        title: 'Pros of Cryosleep during the long journey',
        body: "1. Not having to answer the 'Are we there yet' question.",
        topicId: this.topic.id,
        userId: this.user.id
      })
      .then((post) => {
        expect(post.title).toBe('Pros of Cryosleep during the long journey');
        expect(post.body).toBe("1. Not having to answer the 'Are we there yet' question.");
        expect(post.topicId).toBe(this.topic.id);
        expect(post.userId).toBe(this.user.id);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
    it('should not create a post with missing title, body, or assigned topic', (done) => {
      Post.create({
        title:'Pros of Cryosleep during the long journey'
      })
      .then((post) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain('Post.body cannot be null');
        expect(err.message).toContain('Post.topicId cannot be null');
        done();
      });
    });
  });
  describe('#setTopic()', () => {
    it('should associate a topic and a post together', (done) => {
      Topic.create({
        title: 'Challenges of interstellar travel',
        description: '1. The wifi is terrible'
      })
      .then((newTopic) => {
        expect(this.post.topicId).toBe(this.topic.id);

        this.post.setTopic(newTopic)
        .then((post) => {
          expect(post.topicId).toBe(newTopic.id);
          done();
        });
      });
    });
  });
  describe('#getTopic()', () => {
    it('should return the associated topic', (done) => {
      this.post.getTopic()
      .then((associatedTopic) => {
        expect(associatedTopic.title).toBe('Expeditions to Alpha Centauri');
        done();
      });
    });
  });
  describe('#setUser()', () => {
    it('should associate a post and a user together', (done) => {
      User.create({
        email: 'ada@example.com',
        password: "1234567"
      })
      .then((newUser) => {
        expect(this.post.userId).toBe(this.user.id);
        this.post.setUser(newUser)
        .then((post) => {
          expect(this.post.userId).toBe(newUser.id);
          done();
        });
      });
    });
  });
  describe('#getUser()', () => {
    it('should return the associated topic', (done) => {
      this.post.getUser()
      .then((associatedUser) => {
        expect(associatedUser.email).toBe('user@email.com');
        done();
      });
    });
  });
  describe('#getPoints()', () => {
    it('should return the number of votes associated with the post', (done) => {
        Post.create({
            title: "Post Test",
            body: "Post body",
            topicId: this.topic.id,
            userId: this.user.id,
            votes: [{
                value: 1,
                userId: this.user.id
            }]
        }, {
            include: {
                model: Vote,
                as: "votes"
            }
        })
        .then((post) => {
            expect(post.getPoints()).toBe(1);
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });
}); 
describe('#hasUpvoteFor()', () => {
    it('should return true if the user with matching id has an upvote', (done) => {
        Post.create({
            title: "Landing on the moon",
            body: "It was amazing",
            topicId: this.topic.id,
            userId: this.user.id,
            votes: [{
                value: 1,
                userId: this.user.id
            }]
        }, {
            include: {
                model: Vote,
                as: "votes"
            }
        })
        .then((post) => {
            expect(post.hasUpvoteFor(post.userId)).toBe(true);
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });
});
describe('#hasDownvoteFor()', () => {
    it('should return true if the user has an downvote', (done) => {
        Post.create({
            title: "Landing on Mars",
            body: "It was very orange and dusty.",
            topicId: this.topic.id,
            userId: this.user.id,
            votes: [{
                value: -1,
                userId: this.user.id
            }]
        }, {
            include: {
                model: Vote,
                as: "votes"
            }
        })
        .then((post) => {
            expect(post.hasDownvoteFor(post.userId)).toBe(true);
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });
}); 


});
