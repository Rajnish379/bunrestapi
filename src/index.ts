import { Elysia,t } from "elysia";
import { plugin } from "./plugin";
import { signinDTO } from "./models";

 

// APPLICATION
const app = new Elysia().get("/", () => "Hello Bunny")
.use(plugin)
.state({
  id: 1,
  email: 'rajinish@gmail.com'
})
.decorate('getDate',()=> Date.now())
.get('/post/:id',({params: {id}}) => {return {id: id, title: 'Learn Bun'}})
.post('/post',({body,set,store}) => {
  console.log(store)
  set.status = 201
  return body
})
.get('/track/*',() => {return 'Track Route'})
.get('/tracks',({store,getDate}) => {
  

   // return new Response(JSON.stringify({
  //   "tracks" : [
  //     'Dancing Feat',
  //     'Sam I',
  //     'Balle Balle',
  //   ]
  // }),{
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  // Elicia does the stringifying of json for us so we don't have to do it ourselves
  console.log(store)
  console.log(getDate())
  console.log(store['plugin-version'])
  return  {
    "tracks": [
    'Dancing Feat',
    'Sam I',
    'New'
  ]}
});

app.group('/user',app => app
.post('/sign-in',({body}) => body, {
  body: signinDTO,
  response: signinDTO
})
.post('/sign-up',() => "Signup Route")
.post('/profile',() => "Profile Route")
.get('/:id',() => 'User by id Route')
)

app.group('/v1',app => app
.get('/', () =>  "Version 1")
.group('/products',app => app
.post('/',() => "Create Product")
.get('/:id',({params: {id}}) => {
  return id
},
{
  params: t.Object({
    id: t.Numeric()
  })
})
.put('/:id',() => "UPDATE product by id")
.delete('/:id',() => "DELETE PRODUCT BY ID")
)
)

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
