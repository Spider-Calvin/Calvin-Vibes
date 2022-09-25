export default {
  name: "playlists",
  title: "Playlists",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "tracks",
      title: "Tracks",
      type: "array",
      of: [{type:"track"}]
    }
  ]
};
