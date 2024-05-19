import { use, should } from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
import Record from "../models/Record.js";

const chai = use(chaiHttp);
should();

describe("Tasks for the API", () => {
  beforeEach(async () => {
    // Before each test, we clear the database
    await Record.deleteMany({});
  });

  //
  // Test the POST Route
  //
  describe("POST /api/sleep", () => {
    // POST TEST 1: should add a new sleep record if valid inputs are provided
    it("should add a new sleep record", (done) => {
      const sleepRecord = {
        userId: "user123",
        hours: 8,
      };

      chai
        .request(server)
        .post("/api/sleep")
        .send(sleepRecord)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          res.body.newRecord.should.have.property("userId").eql("user123");
          res.body.newRecord.should.have.property("hours").eql(8);
          done();
        });
    });

    // POST TEST 2: should not add a new sleep record if any input is missing
    it("should not add a record without hours field", (done) => {
      const sleepRecord = {
        userId: "user123",
      };

      chai
        .request(server)
        .post("/api/sleep")
        .send(sleepRecord)
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql("Missing required fields");
          done();
        });
    });
  });

  // POST TEST 3: should not add a new sleep record if invalid inputs are provided
  it("should not add a record with invalid hours value (negative number)", (done) => {
    const sleepRecord = {
      userId: "user123",
      hours: -8, // Invalid negative value for hours
    };

    chai
      .request(server)
      .post("/api/sleep")
      .send(sleepRecord)
      .end((err, res) => {
        res.should.have.status(400);
        res.text.should.be.eql(
          "Invalid hours value, it must be a positive number"
        );
        done();
      });
  });

  it("should not add a record with invalid hours value (non-numeric)", (done) => {
    const sleepRecord = {
      userId: "user123",
      hours: "eight", // Invalid non-numeric value for hours
    };

    chai
      .request(server)
      .post("/api/sleep")
      .send(sleepRecord)
      .end((err, res) => {
        res.should.have.status(400);
        res.text.should.be.eql(
          "Invalid hours value, it must be a positive number"
        );
        done();
      });
  });

  //
  // Test the GET Route
  //
  describe("GET /api/sleep/:userId", () => {
    // GET TEST 1: should get all the sleep records for a valid userId
    it("should get all sleep records for a user", (done) => {
      const sleepRecord1 = { userId: "user123", hours: 8 };
      const sleepRecord2 = { userId: "user123", hours: 7 };

      // First, create sleep records using POST requests
      chai
        .request(server)
        .post("/api/sleep")
        .send(sleepRecord1)
        .end(() => {
          chai
            .request(server)
            .post("/api/sleep")
            .send(sleepRecord2)
            .end(() => {
              // After creating sleep records, send GET request to retrieve them
              chai
                .request(server)
                .get("/api/sleep/user123")
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a("array");
                  res.body.length.should.be.eql(2);
                  done();
                });
            });
        });
    });

    // GET TEST 2: should return an empty array for a non-existent userId
    it("should return an empty array for a user with no records", (done) => {
      chai
        .request(server)
        .get("/api/sleep/nonExistentUser")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array").that.is.empty;
          done();
        });
    });
  });

  //
  // Test the DELETE Route
  //
  describe("DELETE /api/sleep/:recordId", () => {
    // DELETE TEST 1: should delete the record when a valid recordId is given
    it("should delete a sleep record by its ID", (done) => {
      const sleepRecordData = { userId: "user123", hours: 8 };
      // First, create the record using a POST request
      chai
        .request(server)
        .post("/api/sleep")
        .send(sleepRecordData)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          const recordId = res.body.newRecord._id; // Get the ID of the created record

          // Then, delete the record using a DELETE request
          chai
            .request(server)
            .delete(`/api/sleep/${recordId}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.text.should.be.eql("Record deleted");
              done();
            });
        });
    });

    // DELETE TEST 2: should return 404 when a valid recordId is given but it doesn't exist in the database
    it("should return 404 if the record does not exist", (done) => {
      const nonExistentId = "60d21b4667d0d8992e610c85";

      chai
        .request(server)
        .delete(`/api/sleep/${nonExistentId}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eql("Record not found");
          done();
        });
    });

    // DELETE TEST 3: should return 400 when an invalid recordId is provided
    it("should return 400 if an invalid recordId is provided", (done) => {
      const invalidRecordId = "invalidId"; // An invalid recordId

      chai
        .request(server)
        .delete(`/api/sleep/${invalidRecordId}`)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          res.body.should.have.property("Error Message");
          res.body.should.have
            .property("Suggestion")
            .eql("Use a valid MongoDB id");
          done();
        });
    });
  });
});
