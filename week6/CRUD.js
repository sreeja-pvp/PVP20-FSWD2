const { MongoClient } = require('mongodb')
async function main() {

    const uri = "mongodb+srv://sreeja:mongodb@cluster0.tb19n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected");
       // await getUsers(client);
        newUser = {
            name: 'John Baratheon',
            email: 'John_addy@gameofthron.es',
            password: '$3b$12$yGqxLG9LZpXA2xVDhuPnSOZd.VURVkz7wgOLY3pnO0s7u2S1ZO32y'
        }
       // await insertUser(client,newUser);

    //    await updateEmailID(client,"John Baratheon",{
    //     name: 'John Baratheon',
    //         email: 'John_Baratheon@gameofthron.es',
    //         password: '$3b$12$yGqxLG9LZpXA2xVDhuPnSOZd.VURVkz7wgOLY3pnO0s7u2S1ZO32y'
    //    })
    await deleteByEmailID(client,'John_Baratheon@gameofthron.es') ;
    await getUserByEmailID(client,"John_Baratheon@gameofthron.es");

    }
    finally {
        await client.close();
    }
}



 async function getUsers(client){
    const cursor = client.db("sample_mflix").collection("users").find();
        const users = await cursor.toArray();
        
        if (users.length == 0)
            console.log("No users found !!")
        else {
           let count = 0;
            users.forEach(user => {
                count++;
                console.log(`_id : ${user._id}`);
                console.log(`name : ${user.name}`);
                console.log(`email : ${user.email}`);
                console.log(`-----------------------------------`);
            })
            console.log(`Total ${count}users`);
        }

    }

async function getUserByEmailID(client,email){
    const result = await client.db("sample_mflix").collection("users").findOne({email : email});
    if(result)
    {
        console.log(result)
    }else
    console.log("User Details didn't found");
}
async function insertUser(client,newUser){
        const result = await client.db("sample_mflix").collection("users").insertOne(newUser);
        console.log(`new user inserted ${result.insertedId}`);
    }

    main().catch(console.error);

async function updateEmailID(client,username,updatedUser) {
        const result = await client.db("sample_mflix").collection("users").updateOne({name :username }, {$set: updatedUser})
        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function deleteByEmailID(client, emailID) {
    const result = await client.db("sample_mflix").collection("users")
            .deleteOne({email:emailID});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}