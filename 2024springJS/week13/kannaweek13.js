const Museums = [
    {
        id: 0,
        name: "Kennedy Museum of Art",
        address1: "100 Ridges Circle",
        address2: "",
        address3: "",
        city: "Athens",
        state: "OH",
        zipCode: "45701",
        website: "https://www.ohio.edu/museum",
        phone: "740-593-1304",
        email: ""
    },
    {
        id: 1,
        name: "Ohio Valley Museum of Discovery",
        address1: "67 Columbus Rd.",
        address2: "",
        address3: "",
        city: "Athens",
        state: "OH",
        zipCode: "45701",
        website: "https://www.ovmod.org",
        phone: "",
        email: ""
    },
    {
        id: 2,
        name: "Southeast Ohio History Center",
        address1: "24 W. State St.",
        address2: "",
        address3: "",
        city: "Athens",
        state: "OH",
        zipCode: "45701",
        website: "https://southeastohiohistory.org",
        phone: "740-592-2280",
        email: "dominique@southeastohiohistory.org"
    },
    {
        id: 3,
        name: "Cannabis Museum",
        address1: "16050 Cannaville Rd.",
        address2: "",
        address3: "",
        city: "Athens",
        state: "OH",
        zipCode: "45701",
        website: "https://southeastohiohistory.org",
        phone: "740-331-4558",
        email: "kristyn@CannabisMuseum.com"
    }

];

let jsonString = JSON.stringify(Museums);

console.log(jsonString);
