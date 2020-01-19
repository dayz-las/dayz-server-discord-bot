const supertest = require("supertest");
const { app } = require("../src/server");
const getServerStatusUseCase = require("../src/domain/get-server-status.usecase");
const request = supertest(app);
const {
  serverStatusResponseFixture
} = require("../test/util/fixture/server-status-response.fixture");
const {
  getServerStatusUseCaseFixture
} = require("../test/util/fixture/get-server-status-usecase.fixture");

describe("api", () => {
  it("Should return server status when GET /api/server/status is called, given getServerStatusUseCase resolves", done => {
    getServerStatusUseCase.execute = jest.fn(() =>
      Promise.resolve(getServerStatusUseCaseFixture)
    );

    request.get("/api/server/status").end((err, res) => {
      expect(res.body).toEqual(serverStatusResponseFixture);
      done();
    });
  });
});
