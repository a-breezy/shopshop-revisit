export function pluralize(name, count) {
	if (count === 1) {
		return name;
	}
	return name + "s";
}

// run whenever first connecting or connection after update to version
export function idbPromise(storeName, method, object) {
	return new Promise((resolve, reject) => {
		// open connection to shop-shop db v 1
		const request = window.indexedDB.open("shop-shop", 1);

		let db, tx, store;

		// if v changes, create three object stores
		request.onupgradeneeded = function (e) {
			const db = request.result;
			// create object store for each type of data and set 'primary' key to data '_id'
			db.createObjectStore("products", { keyPath: "_id" });
			db.createObjectStore("categories", { keyPath: "_id" });
			db.createObjectStore("cart", { keyPath: "_id" });
		};

		request.onerror = function (e) {
			console.log("There was an error");
		};

		request.onsuccess = function (e) {
			// save ref of db to 'db' variable
			db = request.result;
			// open transaction for 'storeName'
			tx = db.transaction(storeName, "readwrite");
			// save ref to that obj store
			store = tx.objectStore(storeName);

			db.onerror = function (e) {
				console.log("error", e);
			};

			// define crud operations
			switch (method) {
				case "put":
					store.put(object);
					resolve(object);
					break;
				case "get":
					const all = store.getAll();
					all.onsuccess = function () {
						resolve(all.result);
					};
					break;
				case "delete":
					store.delete(object._id);
					break;
				default:
					console.log("No valid method");
					break;
			}

			// when transaction complete close connection
			tx.oncomplete = function () {
				db.close();
			};
		};
	});
}
