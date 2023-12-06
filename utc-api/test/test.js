process.env.NODE_ENV = 'test'

let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../index')
let should = chai.should()

require('dotenv').config()

let credential = {
    username: process.env.STUDENTID,
    password: process.env.PASSWORD
}

chai.use(chaiHttp)

describe('Api', () => {
    describe('/POST schedule', () => {
        it('it should returns an object', (done) => {         
            chai.request(app)
                .post('/schedule')
                .send(credential)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        }),
        it('it should returns an array in Data property', (done) => {         
            chai.request(app)
                .post('/schedule')
                .send(credential)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('data').be.a('array')
                    done()
                })
        }),
        it('it should returns an array of subject object in Data', (done) => {         
            chai.request(app)
                .post('/schedule')
                .send(credential)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.data.should.be.a('array')
                   
                    done()
                })
        })
    })
})