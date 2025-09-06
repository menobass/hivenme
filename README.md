# 🐝 HiveandMe

**HiveandMe** is a modern web application for exploring detailed Hive blockchain account statistics. Similar to hivestats.io, it provides comprehensive insights into Hive accounts including posting history, voting patterns, wallet information, and more.

## Features

- 🔍 **Account Search**: Search for any Hive account by username
- 📊 **Account Overview**: View reputation, followers, following, and join date
- 📝 **Posting Statistics**: Track post count and activity patterns
- 🗳️ **Voting Information**: Monitor voting power and behavior
- 💰 **Wallet Details**: Check HIVE, HBD, and Hive Power balances
- ⚡ **Recent Activity**: See latest account actions
- 📱 **Responsive Design**: Works perfectly on desktop and mobile

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hivenme
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. Enter a Hive username in the search box (with or without the @ symbol)
2. Click "Search Account" or press Enter
3. View detailed statistics and information about the account
4. Try searching for "test" to see the demo data

## Technology Stack

- **Framework**: Vanilla JavaScript with Vite
- **Styling**: Modern CSS with CSS Grid and Flexbox
- **Build Tool**: Vite
- **API**: Hive blockchain API (integration needed)

## Current Status

This is the initial version with:
- ✅ Complete UI/UX design
- ✅ Mock data implementation
- ⏳ Hive API integration (planned)
- ⏳ Advanced statistics (planned)
- ⏳ Historical data visualization (planned)

## Planned Features

- Real Hive blockchain API integration
- Post history with detailed analytics
- Voting patterns visualization
- Delegation information
- Witness voting history
- Market data integration
- Account comparison features
- Data export capabilities

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by hivestats.io
- Built for the Hive blockchain community
- Powered by Vite and modern web technologies

---

**Note**: This application currently uses mock data. Integration with the Hive blockchain API is planned for future releases.
