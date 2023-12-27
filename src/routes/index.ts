import { Hono } from "hono";
import { seedController } from "../controllers/seed.controller";
import { typeController } from "../controllers/type.controller";
import { vehicleController } from "../controllers/vehicle.controller";
import { trimController } from "../controllers/trim.controller";
import { modelController } from "../controllers/model.controller";
import { makeController } from "../controllers/make.controller";
import { homeController } from "../controllers/home.controller";

export const routes = new Hono();

/* The code `routes.get("/", (c) => c.json("Car Inventory API", 200));` is defining a route for
handling GET requests to the root endpoint ("/"). When a GET request is made to this endpoint, the
code inside the callback function will be executed. In this case, it returns a JSON response with
the message "Car Inventory API" and a status code of 200. */
routes.get("/", (c) => c.json("Car Inventory API", 200));
routes.get("/seed", async (c) => {
	try {
		const data = await seedController.seed(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

/* The code block you provided is defining routes for handling POST requests to the "/login" and
"/register" endpoints. */
routes.post("/login", async (c) => {
	try {
		const data = await homeController.login(c);
		return c.json(data, 201);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.post("/register", async (c) => {
	try {
		const data = await homeController.register(c);
		return c.json(data, 201);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

/* The code `routes.get("/types", async (c) => { ... })` is defining a route for handling GET requests
to the "/types" endpoint. When a GET request is made to this endpoint, the code inside the callback
function will be executed. */
routes.get("/types", async (c) => {
	try {
		const data = await typeController.getTypes(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.get("/type/:id", async (c) => {
	try {
		const data = await typeController.getType(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

/* The code block you provided is defining routes for handling various CRUD operations related to
vehicles in a car inventory API. */
routes.get("/vehicles", async (c) => {
	try {
		const data = await vehicleController.getVehicles(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.get("/vehicle/:id", async (c) => {
	try {
		const data = await vehicleController.getVehicle(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.post("/vehicle", async (c) => {
	try {
		const data = await vehicleController.addVehicle(c);
		return c.json(data, 201);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.put("/vehicle/:id", async (c) => {
	try {
		const data = await vehicleController.updateVehicle(c);
		return c.json(data, 201);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.delete("/vehicle/:id", async (c) => {
	try {
		const data = await vehicleController.deleteVehicle(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

/* The code block you provided is defining routes for handling various CRUD operations related to trims
in a car inventory API. */
routes.get("/car/trims", async (c) => {
	try {
		const data = await trimController.getTrims(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.get("/car/trim/:id", async (c) => {
	try {
		const data = await trimController.getTrim(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.post("/car/trim", async (c) => {
	try {
		const data = await trimController.addTrim(c);
		return c.json(data, 201);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.put("/car/trim/:id", async (c) => {
	try {
		const data = await trimController.updateTrim(c);
		return c.json(data, 201);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.delete("/car/trim/:id", async (c) => {
	try {
		const data = await trimController.deleteTrim(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

/* The code block you provided is defining routes for handling various CRUD operations related to
models in a car inventory API. */
routes.get("/models", async (c) => {
	try {
		const data = await modelController.getModels(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.get("/model/:id", async (c) => {
	try {
		const data = await modelController.getModel(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.post("/model", async (c) => {
	try {
		const data = await modelController.addModel(c);
		return c.json(data, 201);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.put("/model/:id", async (c) => {
	try {
		const data = await modelController.updateModel(c);
		return c.json(data, 201);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.delete("/model/:id", async (c) => {
	try {
		const data = await modelController.deleteModel(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

/* The code block you provided is defining routes for handling various CRUD operations related to
"makes" in a car inventory API. */
routes.get("/makes", async (c) => {
	try {
		const data = await makeController.getMakes(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.get("/make/:id", async (c) => {
	try {
		const data = await makeController.getMake(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.post("/make", async (c) => {
	try {
		const data = await makeController.addMake(c);
		return c.json(data, 201);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.put("/make/:id", async (c) => {
	try {
		const data = await makeController.updateMake(c);
		return c.json(data, 201);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});

routes.delete("/make/:id", async (c) => {
	try {
		const data = await makeController.deleteMake(c);
		return c.json(data, 200);
	} catch (error) {
		console.log(error);
		return c.json(error, 400);
	}
});
