const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@cluster0.bndg37a.mongodb.net/?retryWrites=true&w=majority" // Replace <username> and <password> with the corresponding authentications for this cluster.

const uri = "mongodb+srv://miranda:2g94gGQk4mFiDzr9qGVY@cluster0.bndg37a.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

async function run() {
	try {
		const database = client.db("movieDB");
		const movies = database.collection("movies");

		const query_showing = { status: "showing" };
		const query_upcoming = { status: "upcoming" };
		
		const cursor_showing = movies.find(query_showing);
		const cursor_upcoming = movies.find(query_upcoming);
	
		// Code for testing purposes. To be removed when FE is implemented.
		// Here...	
		if ((await movies.countDocuments(query_showing)) === 0) {
			console.log("No movies being shown.");
		}
		if ((await movies.countDocuments(query_upcoming)) === 0) {
			console.log("No upcoming movies.");
		}

		for await (const showing of cursor_showing) {
			console.dir(showing);
		}
		for await (const upcoming of cursor_upcoming) {
			console.dir(upcoming);
		}
		// ...to here.

	} finally {
		await client.close();
	}
}

run().catch(console.dir);
