import { request, response, Router } from 'express';
import CreateUserController from '@adapters/controllers/user-create.ctrl';

const routes = Router();
const createUserController = new CreateUserController();

routes.get("/", (request, response) => {
    return response.json({ message: "Hello World"})
});

routes.post("/users", (request, response) => createUserController.execute(request));

export default routes;