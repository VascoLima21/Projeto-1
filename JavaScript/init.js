initdata();

function initdata() {
  // User
  if (!localStorage.users) {
    const users= [
        {
            username: "Tiago Teixeira",
            password: "ronaldO123",
            type: "admin",
            bestTime: NaN,
            profilePic: "default",
            description: "",
            email: "tteixeira@esmad.ipp.pt",
            country: "portugal",
            gender: "male",
            achievements: [],

          },
          {
            username: "Liam",
            password: "jackBlack321",
            type: "admin",
            bestTime: NaN,
            profilePic: "default",
            description: "",
            email: "liam@gmail.com",
            country: "portugal",
            gender: "male",
            achievements: [],
          },
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }

}