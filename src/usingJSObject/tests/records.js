import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';

import app from '../../app';

chai.use(chaiHttp);

describe('red-flags/ Controller', () => {
  it('should create new record', (done) => {
    chai
      .request(app)
      .post('/api/v1/red-flags/')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        name: 'Bribery and Corruption',
        createdBy: 'Paulot',
        type: 'redFlag',
        images: [
          'image.png',
          'image.jpg',
        ],
        videos: [
          'videos.mp4',
          'videos.avi',
        ],
        location: 'Ayobo',
        comment: 'He recieved bribe',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(201);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data.length).to.equal(1);
        expect(res.body.data[0].id).to.exist;
        expect(res.body.data[0].message).to.equal('Created red-flag record succesfully');
        expect(res.body.status).to.equal(201);
        done();
      });
  });

  it('should not create without name', (done) => {
    chai
      .request(app)
      .post('/api/v1/red-flags/')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        name: '',
        createdBy: 'Paulot',
        type: 'redFlag',
        images: [
          'image.png',
          'image.jpg',
        ],
        videos: [
          'videos.mp4',
          'videos.avi',
        ],
        location: 'Ayobo',
        comment: 'He recieved bribe',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal('Please provide a valid record name');
        expect(res.body.status).to.equal(400);
        done();
      });
  });

  // it('should not create without type', (done) => {
  //   chai
  //     .request(app)
  //     .post('/api/v1/red-flags/')
  //     .set({
  //       'Content-type': 'application/json',
  //     })
  //     .send({
  //       name: 'Bribery and Corruption',
  //       createdBy: 'Paulot',
  //       type: '',
  //       images: [
  //         'image.png',
  //         'image.jpg',
  //       ],
  //       videos: [
  //         'videos.mp4',
  //         'videos.avi',
  //       ],
  //       location: 'Ayobo',
  //       comment: 'He recieved bribe',
  //     })
  //     .end((err, res) => {
  //       expect(res.body).to.be.an('object');
  //       expect(res.statusCode).to.equal(400);
  //       expect(res.body.error).to.equal('Please provide a valid record type');
  //       expect(res.body.status).to.equal(400);
  //       done();
  //     });
  // });

  it('should not create without location', (done) => {
    chai
      .request(app)
      .post('/api/v1/red-flags/')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        name: 'Bribery and Corruption',
        createdBy: 'Paulot',
        type: 'redFlag',
        images: [
          'image.png',
          'image.jpg',
        ],
        videos: [
          'videos.mp4',
          'videos.avi',
        ],
        location: '',
        comment: 'He recieved bribe',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal('Please provide a valid location');
        expect(res.body.status).to.equal(400);
        done();
      });
  });

  it('should not create without a comment', (done) => {
    chai
      .request(app)
      .post('/api/v1/red-flags/')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        name: 'Bribery and Corruption',
        createdBy: 'Paulot',
        type: 'redFlag',
        images: [
          'image.png',
          'image.jpg',
        ],
        videos: [
          'videos.mp4',
          'videos.avi',
        ],
        location: 'Ayobo',
        comment: '',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal('Please comment');
        expect(res.body.status).to.equal(400);
        done();
      });
  });

  describe('Get all red-flags/', () => {
    it('should get all red-flags/', (done) => {
      chai
        .request(app)
        .get('/api/v1/red-flags/')
        .set({
          'Content-type': 'application/json',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('Get a specific record', () => {
    it('should get a specific record', (done) => {
      chai
        .request(app)
        .get('/api/v1/red-flags/:id')
        .set({
          'Content-type': 'application/json',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.equal(1);
          done();
        });
    });
  });


  describe('Delete a Record', () => {
    it('should delete a record', (done) => {
      chai
        .request(app)
        .delete('/api/v1/red-flags/:id')
        .set({
          'Content-type': 'application/json',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.statusCode).to.be.equal(200);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Record Update', () => {
    it('should not update without location', (done) => {
      chai
        .request(app)
        .patch('/api/v1/red-flags/:id/location')
        .set({
          'Content-type': 'application/json',
        })
        .send({
          name: 'Bribery and Corruption',
          createdBy: 'Paulot',
          type: 'redFlag',
          images: [
            'image.png',
            'image.jpg',
          ],
          videos: [
            'videos.mp4',
            'videos.avi',
          ],
          location: '',
          comment: 'He recieved bribe',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equal('Please provide a valid location');
          expect(res.body.status).to.equal(400);
          done();
        });
    });

    it('should not update without a comment', (done) => {
      chai
        .request(app)
        .patch('/api/v1/red-flags/:id/comment')
        .set({
          'Content-type': 'application/json',
        })
        .send({
          name: 'Bribery and Corruption',
          createdBy: 'Paulot',
          type: 'redFlag',
          images: [
            'image.png',
            'image.jpg',
          ],
          videos: [
            'videos.mp4',
            'videos.avi',
          ],
          location: 'Ayobo',
          comment: '',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equal('Please comment');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });
});
