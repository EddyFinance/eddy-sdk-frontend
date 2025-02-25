# Next.js Project

## Overview
This is a Next.js project with two main routes:
- **Home** (`/`): The Cross Chain Widget For Swap.
- **Pools** (`/pools`): A page displaying available pools.

## Installation

### Prerequisites
Ensure you have **Node.js** and **npm/yarn** installed.

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/EddyFinance/eddy-sdk-frontend.git
   cd sdk-frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```sh
   http://localhost:3000
   ```

## Hooks
The application uses several custom hooks located in the `src/components/hooks` directory:

1. **useFetchContractConfig** - Fetches contract configuration including ABIs and addresses
2. **useFetchDefaultTokens** - Gets the list of default tokens supported by the bridge
3. **useBridgeQuote** - Fetches quote information for bridge transfers including fees and estimated time
4. **useFetchTokens** - Retrieves all tokens across a particular chain based on function type (cross chain or swap)

## License
This project is licensed under the [MIT License](LICENSE).