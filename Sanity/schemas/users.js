export default {
  name: "users",
  title: "Users",
  type: "document",
  fields: [
    {
      name: "firstname",
      title: "First Name",
      type: "string",
    },
    {
      name: "lastname",
      title: "Last Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "phonenumber",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "dob",
      title: "Date Of Birth",
      type: "string",
    },
    {
      name: "password",
      title: "Password",
      type: "string",
    },
    {
      name: "artist_ids",
      title: "Artist Ids",
      type: "array",
      of: [
        {
          name: "ids",
          title: "ids",
          type: "string",
        },
      ],
    },
    {
      name: "preferedGenner",
      title: "Music Genner",
      type: "array",
      of: [
        {
          name: "ids",
          title: "ids",
          type: "string",
        },
      ],
    },
    {
      name: "types_selected",
      title: "Type of music",
      type: "array",
      of: [
        {
          name: "ids",
          title: "ids",
          type: "string",
        },
      ],
    },
  ],
};
