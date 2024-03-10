# Useless Facts Viewer

A simple single-page application uses Useless Facts API, and built with Next.js, Axios, and Supabase.

## Demo

Check out the live demo: [Useless Facts Viewer Demo](https://useless-facts-two.vercel.app/)

## Sample User Data

To demonstrate the functionality of the app feel free to sign in or here's an existed user credantials:

-  **Email:** test@gmail.com
-  **Passport:** test123


## Features

Fact viewer:

-  Fetches random facts from the Useless Facts API using Axios.
-  Allows users to choose their preferred language for facts.
-  Provides both random and fact-of-the-day modes.
-  Next fact button for seamless exploration.


User Authentication:

- Utilizes Supabase Auth for user creation.

Save facts:

-  a. Fact basket
-  Enables users to add both random and today's facts to the basket.
-  Basket items can be deleted both from the basket and from individual fact cards.
-  Options to clear and save basket.
-  Save button inserts facts into the database.

  
-  b. Saved facts
-  Retrieves facts from the database.
-  Permanent storage.
-  Allows removal of saved facts from the database.


## Key Decisions
- **Language Change:** Users control language preferences without instant fact updates upon a change. Users decide when to fetch facts, giving a smoother experience without automatic switches. This way, users explore facts at their own pace.
  
- **Context Usage:** Simplifies state management with React context through FactContext and AuthContext, and removes the prop drilling.
For more details on effective usage of React Context, check out [How to Use React Context Effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)

-  **Axios for Fact Fetching:**
-  This project utilizes Axios with a pre-configured instance, including a base URL and JSON format.


## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/)
- [Axios](https://axios-http.com/)

  ## Additional Dependency
- [Sonner](https://sonner.emilkowal.ski/): A toast component for React.
