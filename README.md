## Overview

In this project, we're going to pull down an existing React/Vite project, and modify it to use ethers to talk to the padlock contract we previously deployed to Optimism Goerli.

## Steps

1. Create a new project
2. Configure our provider
3. Add a react component to the App
4. Configure the component to talk to Contract

## Create a new project using wagmi.sh

We're going to be using wagmi. Their default installer is good for getting up and running quickly. There are lots of options, but we will be using `Vite (React)` for our framework, `Default` template, and `Alchemy` for our provider.

```bash
npm init wagmi <foldername>
```

eg: 
```bash
kethic@opstation:~/github$ npm init wagmi project5
Need to install the following packages:
  create-wagmi
Ok to proceed? (y) 

Welcome to create-wagmi – the quickest way to get started with wagmi!

✔ Using project name: project5
✔ What framework would you like to use? › Vite (React)
✔ What template would you like to use? › Default
✔ What providers would you like to use? › Alchemy
Creating a new wagmi app in /home/kethic/github/project5.

Using Vite (React).

Using npm.

✔ Installed packages.

✔ Initialized git repository.

―――――――――――――――――――――

Success! Created project5 at /home/kethic/github/project5

To start your app, run `cd project5` and then `npm run dev`

―――――――――――――――――――――

Important note: It is HIGHLY recommended that you add an alchemyProvider, infuraProvider, or alike to src/wagmi.ts before deploying your project to production to prevent being rate-limited.

Read more: https://wagmi.sh/docs/getting-started#configure-chains

kethic@opstation:~/github$ cd project5
kethic@opstation:~/github/project5$ code .
```

You should now have a pile of files in your project folder.  This is already a fully functional app, that can connect to a wallet and look up the ENS record if it exists.  Open a terminal and take it for a spin.

```bash
npm run dev
```

Click the link in the terminal to pop open the test app.  (it was http://localhost:5173 on my machine).  `Ctrl-C` in the terminal will stop the app.

## Configure our provider

Apps can access the blockchain using default and public providers, but they are widely used, and generally resource and timing constrained.  Dedicated providers offer a better experience for the dev, and the user.

Some providers offer specialized or optimized functionality, and wagmi has Provider libraries that can take advantage of this.

In ethers, we created provider objects directly using `ethers.providers.WebSocketProvider` or `ethers.providers.JsonRpcProvider`.  

In wagmi, we configure our networks, providers, and clients, in `src/wagmi.ts`, and then import the derived objects as needed.

1. Configure `.env`

    Go get an RPC key from Alchemy for Optimism Goerli, and add it to your .env files.  
    
    We're using `VITE_ALCHEMY_API_KEY='xx_yyyyyyy-zzzzzzzzzzzzzzzzzzzzz` as the format this time.

2. Set up our networks in `src\wagmi.ts`

    Near the top of the file you will see:

    ```ts
    import { goerli, mainnet } from 'wagmi/chains'
    ```

    Our contract is on Optimism Goerli.  We need to add `optimismGoerli` to our enabled chains.  The support chainlist and general documentation is here:

- https://wagmi.sh/react/chains#supported-chains
- https://wagmi.sh/react/getting-started#configure-chains
 
3. Add the Alchemy specific provider to `src/wagmi.ts`

- https://wagmi.sh/react/providers/alchemy

4. Update configureChains

    The previous link should have given you a hint.  The current code should look something like this:

    ```ts
    const { chains, provider, webSocketProvider } = configureChains(
        [mainnet, ...(import.meta.env?.MODE === 'development' ? [goerli] : [])],
        [
            publicProvider(),
        ],
    )
    ```

    We need to add `optimismGoerli` to the front of the chain list, and an `alchemyProvider` with `apiKey` to the top of the provider list.  Since this is typescript, you have to protect against undefined variables, so your apiKey should be `process.env.VITE_ALCHEMY_API_KEY || ""`.

## Add a react component to the App

-----

-----

-----

This is a [wagmi](https://wagmi.sh) + [Vite](https://vitejs.dev/) project bootstrapped with [`create-wagmi`](https://github.com/wagmi-dev/wagmi/tree/main/packages/create-wagmi)

# Getting Started

Run `npm run dev` in your terminal, and then open [localhost:5173](http://localhost:5173) in your browser.

Once the webpage has loaded, changes made to files inside the `src/` directory (e.g. `src/App.tsx`) will automatically update the webpage.

# Learn more

To learn more about [Vite](https://vitejs.dev/) or [wagmi](https://wagmi.sh), check out the following resources:

- [wagmi Documentation](https://wagmi.sh) – learn about wagmi Hooks and API.
- [wagmi Examples](https://wagmi.sh/examples/connect-wallet) – a suite of simple examples using wagmi.
- [Vite Documentation](https://vitejs.dev/) – learn about Vite features and API.
