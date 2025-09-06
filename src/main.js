import './style.css'

// HiveandMe Application
class HiveandMe {
  constructor() {
    this.currentAccount = null;
    this.init();
  }

  init() {
    this.renderApp();
    this.bindEvents();
    this.fetchCryptoPrices(); // Fetch prices on app initialization
  }

  renderApp() {
    document.querySelector('#app').innerHTML = `
      <div class="container">
        <header class="header">
          <h1>🐝 HiveandMe</h1>
          <p>Explore Hive Account Statistics</p>
        </header>
        
        <main class="main">
          <div class="search-section">
            <div class="search-container">
              <input 
                type="text" 
                id="accountInput" 
                placeholder="Enter Hive username (e.g., @username)" 
                class="account-input"
              />
              <button id="searchBtn" class="search-btn">Search Account</button>
            </div>
          </div>
          
          <div id="accountData" class="account-data hidden">
            <div class="top-content">
              <!-- Profile Section -->
              <div class="profile-section">
                <div class="profile-card">
                  <h2>PROFILE</h2>
                  <div class="profile-content">
                    <div class="profile-avatar">
                      <img id="profileImage" src="" alt="Profile" class="avatar-img">
                    </div>
                    <div class="profile-info">
                      <h3 id="profileName" class="profile-name"></h3>
                      <p id="profileHandle" class="profile-handle"></p>
                      <p id="profileBio" class="profile-bio"></p>
                      <div id="profileLocation" class="profile-location"></div>
                      <div id="profileWebsite" class="profile-website"></div>
                      
                      <div class="vote-info">
                        <div id="voteValue" class="vote-value"></div>
                        <div class="voting-power">
                          <div class="voting-power-bar">
                            <div id="votingPowerFill" class="voting-power-fill"></div>
                          </div>
                          <div id="votingPowerText" class="voting-power-text"></div>
                        </div>
                        <div id="rechargeTime" class="recharge-time"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Received Rewards Section -->
              <div class="rewards-section">
                <div class="rewards-card">
                  <h2>RECEIVED REWARDS</h2>
                  <div class="curation-apr">
                    <span id="curationApr">Curation APR: --</span>
                  </div>
                  
                  <div class="rewards-table">
                    <div class="rewards-header">
                      <div class="period-col">Period</div>
                      <div class="author-col">Author</div>
                      <div class="curation-col">Curation</div>
                      <div class="witness-col">Witness</div>
                      <div class="total-col">Total</div>
                    </div>
                    
                    <div id="rewardsData" class="rewards-data">
                      <!-- Rewards data will be populated here -->
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Wallet Section -->
              <div class="wallet-section">
                <div class="wallet-card">
                  <h2>WALLET</h2>
                  
                  <!-- HIVE Token -->
                  <div class="token-section">
                    <div class="token-header">
                      <span class="token-symbol">🔶 HIVE</span>
                      <span id="hiveBalance" class="token-balance">0.000</span>
                    </div>
                    <p class="token-description">The primary token of the Hive Blockchain and often a reward on posts.</p>
                    
                    <div class="token-details">
                      <div class="detail-row">
                        <span class="detail-label">Staked HIVE - Hive Power (HP)</span>
                        <div class="detail-value">
                          <span id="stakedHive" class="value">0.000</span>
                          <button class="action-btn stake-btn">⚡ SEND</button>
                        </div>
                      </div>
                      <p class="detail-description">Always a reward on posts. Exchanging Hive for Hive Power is called "Powering Up" or "Staking".</p>
                      
                      <div class="effectiveness-row">
                        <span class="effectiveness-text">Increases the more effectively you vote on posts</span>
                        <span id="voteEffectiveness" class="effectiveness-value">+0.00 - 1%</span>
                        <span class="info-icon">ℹ️</span>
                      </div>
                      
                      <div class="detail-row">
                        <span class="detail-label">Delegated HIVE</span>
                        <div class="detail-value">
                          <span id="delegatedHive" class="value negative">0.000</span>
                          <button class="action-btn details-btn">📋 DETAILS</button>
                        </div>
                      </div>
                      <p class="detail-description">Staked tokens delegated between users.</p>
                      
                      <div class="detail-row">
                        <span class="detail-label">HIVE Savings</span>
                        <div class="detail-value">
                          <span id="hiveSavings" class="value">0.000</span>
                          <button class="action-btn withdraw-btn">💰 WITHDRAW</button>
                        </div>
                      </div>
                      <p class="detail-description">Balance is subject to 3 days withdraw waiting period.</p>
                    </div>
                  </div>
                  
                  <!-- HBD Token -->
                  <div class="token-section hbd-section">
                    <div class="token-header">
                      <span class="token-symbol">💚 HBD (Hive Backed Dollars)</span>
                      <span id="hbdBalance" class="token-balance">0.000</span>
                    </div>
                    <p class="token-description">Another Hive token which is often rewarded on posts.</p>
                    
                    <div class="token-details">
                      <div class="detail-row">
                        <span class="detail-label">Staked HBD</span>
                        <div class="detail-value">
                          <span id="stakedHbd" class="value">0.000</span>
                          <button class="action-btn unstake-btn">⬇️ UNSTAKE</button>
                        </div>
                      </div>
                      <div class="apr-info">
                        <span class="apr-label">NEW!</span>
                        <span class="apr-text">Staked HBD increases at</span>
                        <span id="hbdApr" class="apr-value">15.00%</span>
                        <span class="apr-text">APR as defined by the</span>
                        <a href="#" class="witnesses-link">witnesses</a>
                        <span class="info-icon">ℹ️</span>
                      </div>
                      
                      <div class="detail-row">
                        <span class="detail-label">Staked HBD</span>
                        <div class="detail-value">
                          <span id="hbdSavings" class="value">0.000</span>
                          <button class="action-btn unstake-btn">⬇️ UNSTAKE</button>
                        </div>
                      </div>
                      <p class="detail-description">Balance is subject to 3 days unstake (withdraw) waiting period.</p>
                    </div>
                  </div>
                  
                  <!-- Account Value -->
                  <div class="account-value-section">
                    <div class="account-value-header">
                      <span class="value-label">Estimated Account Value</span>
                      <span id="accountValue" class="account-value">$ 0.00</span>
                    </div>
                    <p class="value-description">USD value of all Hive tokens in your wallet.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats Section - Full Width Below -->
            <div class="bottom-content">
              <!-- Price Section -->
              <div class="price-section">
                <div class="price-blocks">
                  <div class="price-block hbd-block">
                    <div class="price-header">
                      <span class="currency-name">HBD</span>
                      <span class="price-icon">🏦</span>
                    </div>
                    <div class="price-value" id="hbdPrice">$0.00</div>
                    <div class="price-change" id="hbdChange">0.00%</div>
                  </div>
                  
                  <div class="price-block hive-block">
                    <div class="price-header">
                      <span class="currency-name">HIVE</span>
                      <span class="price-icon">🐝</span>
                    </div>
                    <div class="price-value" id="hivePrice">$0.00</div>
                    <div class="price-change" id="hiveChange">0.00%</div>
                  </div>
                </div>
              </div>
              
              <div class="stats-section">
                <div class="stats-card">
                  <h2>STATS</h2>
                  <div id="statsData" class="stats-data">
                    <!-- Stats data will be populated here -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div id="loading" class="loading hidden">
            <div class="spinner"></div>
            <p>Loading account data...</p>
          </div>
          
          <div id="error" class="error hidden">
            <p id="errorMessage"></p>
          </div>
        </main>
      </div>
    `;
  }

  bindEvents() {
    const searchBtn = document.getElementById('searchBtn');
    const accountInput = document.getElementById('accountInput');

    searchBtn.addEventListener('click', () => {
      this.searchAccount();
    });

    accountInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.searchAccount();
      }
    });
  }

  async searchAccount() {
    const accountInput = document.getElementById('accountInput');
    let username = accountInput.value.trim();
    
    if (!username) {
      this.showError('Please enter a username');
      return;
    }

    // Remove @ if present
    username = username.replace('@', '');
    
    this.showLoading();
    this.hideError();

    try {
      // For now, we'll create mock data since we need to implement Hive API integration
      const accountData = await this.fetchAccountData(username);
      this.displayAccountData(accountData);
    } catch (error) {
      this.showError(`Error fetching account data: ${error.message}`);
    } finally {
      this.hideLoading();
    }
  }

  async fetchAccountData(username) {
    try {
      // Try multiple API endpoints in order of preference
      const apiEndpoints = [
        // Try the corrected HAF backend endpoint
        `https://techcoderx.com/haf/account/${username}`,
        // Fallback to our Vercel proxy
        `/api/hive-proxy?username=${username}`,
        // Alternative Hive API endpoints
        `https://api.hive.blog/rpc/get_accounts?names=["${username}"]`
      ];
      
      let response;
      let lastError;
      
      for (const apiUrl of apiEndpoints) {
        try {
          console.log(`Trying API endpoint: ${apiUrl}`);
          response = await fetch(apiUrl);
          
          if (response.ok) {
            console.log(`Success with endpoint: ${apiUrl}`);
            break;
          } else {
            console.log(`Endpoint ${apiUrl} returned status: ${response.status}`);
            lastError = new Error(`API returned status: ${response.status}`);
          }
        } catch (error) {
          console.log(`Endpoint ${apiUrl} failed:`, error.message);
          lastError = error;
          continue;
        }
      }
      
      if (!response || !response.ok) {
        throw lastError || new Error('All API endpoints failed');
      }
      
      const apiData = await response.json();
      console.log('API Response:', apiData); // For debugging
      
      // Transform API data to our format
      return this.transformApiData(apiData, username);
      
    } catch (error) {
      console.error('Error fetching from API:', error.message);
      
      // For development, let's use mock data that represents real account data
      console.log(`Falling back to mock data for account: ${username}`);
      return this.getMockDataForUser(username);
    }
  }

  transformApiData(apiData, username) {
    // Transform the API response to match our expected data structure
    // This will be updated once we see the actual API response structure
    return {
      username: username,
      reputation: apiData.reputation || 0,
      about: apiData.about || apiData.profile?.about || 'No bio available',
      location: apiData.location || apiData.profile?.location || null,
      website: apiData.website || apiData.profile?.website || null,
      followers: apiData.followers_count || 0,
      following: apiData.following_count || 0,
      postCount: apiData.post_count || 0,
      hiveBalance: apiData.hive_balance || '0.000',
      hbdBalance: apiData.hbd_balance || '0.000',
      vestingShares: apiData.vesting_shares || '0.000000',
      voteValue: apiData.vote_value || '0.00',
      votingPower: apiData.voting_power || 100,
      curationApr: apiData.curation_apr || '0.00',
      rechargeTime: this.calculateRechargeTime(apiData.voting_power || 100),
      lastActivity: apiData.last_activity || new Date().toISOString(),
      created: apiData.created || apiData.account_created || new Date().toISOString(),
      rewards: this.extractRewardsData(apiData)
    };
  }

  extractRewardsData(apiData) {
    // Extract rewards data from API response
    // Structure will be updated based on actual API response
    return {
      allTime: {
        author: apiData.total_author_rewards || '0.00',
        curation: apiData.total_curation_rewards || '0.00',
        witness: apiData.total_witness_rewards || '0',
        totalHP: apiData.total_rewards_hp || '0.00',
        totalUSD: apiData.total_rewards_usd || '0.00'
      },
      sevenDays: {
        author: apiData.weekly_author_rewards || '0.00',
        authorHBD: apiData.weekly_author_hbd || '0.00',
        curation: apiData.weekly_curation_rewards || '0.00',
        witness: '0',
        totalHP: apiData.weekly_total_hp || '0.00',
        totalHBD: apiData.weekly_total_hbd || '0.00',
        totalUSD: apiData.weekly_total_usd || '0.00'
      },
      thirtyDays: {
        author: apiData.monthly_author_rewards || '0.00',
        authorHBD: apiData.monthly_author_hbd || '0.00',
        curation: apiData.monthly_curation_rewards || '0.00',
        witness: '0',
        totalHP: apiData.monthly_total_hp || '0.00',
        totalHBD: apiData.monthly_total_hbd || '0.00',
        totalUSD: apiData.monthly_total_usd || '0.00'
      },
      today: {
        author: apiData.daily_author_rewards || '0.00',
        authorHBD: apiData.daily_author_hbd || '0.00',
        curation: apiData.daily_curation_rewards || '0.00',
        witness: '0',
        totalHP: apiData.daily_total_hp || '0.00',
        totalHBD: apiData.daily_total_hbd || '0.00',
        totalUSD: apiData.daily_total_usd || '0.00'
      },
      yesterday: {
        author: apiData.yesterday_author_rewards || '0.00',
        authorHBD: apiData.yesterday_author_hbd || '0.00',
        curation: apiData.yesterday_curation_rewards || '0.00',
        witness: '0',
        totalHP: apiData.yesterday_total_hp || '0.00',
        totalHBD: apiData.yesterday_total_hbd || '0.00',
        totalUSD: apiData.yesterday_total_usd || '0.00'
      }
    };
  }

  generateLast7Days() {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      let dayLabel;
      if (i === 0) {
        dayLabel = 'Today';
      } else if (i === 1) {
        dayLabel = 'Yesterday';
      } else {
        // Get day name (Mon, Tue, Wed, etc.)
        dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
      }
      
      days.push({
        label: dayLabel,
        date: date,
        dayIndex: i
      });
    }
    
    return days;
  }

  async fetchCryptoPrices() {
    try {
      // CoinGecko API for HIVE and HBD prices
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=hive-blockchain,hive_dollar&vs_currencies=usd&include_24hr_change=true');
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('CoinGecko API Response:', data);
      
      this.updatePriceDisplay(data);
      
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
      // Display fallback prices if API fails
      this.updatePriceDisplay({
        'hive-blockchain': {
          usd: 0.20,
          usd_24h_change: -1.5
        },
        'hive_dollar': {
          usd: 0.98,
          usd_24h_change: 0.1
        }
      });
    }
  }

  updatePriceDisplay(data) {
    const hivePrice = document.getElementById('hivePrice');
    const hiveChange = document.getElementById('hiveChange');
    const hbdPrice = document.getElementById('hbdPrice');
    const hbdChange = document.getElementById('hbdChange');

    // Update HIVE price
    if (data['hive-blockchain']) {
      const hiveData = data['hive-blockchain'];
      hivePrice.textContent = `$${hiveData.usd?.toFixed(3) || '0.000'}`;
      
      const hiveChangeValue = hiveData.usd_24h_change || 0;
      const hiveChangeText = `${hiveChangeValue >= 0 ? '+' : ''}${hiveChangeValue.toFixed(2)}%`;
      hiveChange.textContent = hiveChangeText;
      
      // Apply color classes
      hiveChange.className = 'price-change';
      if (hiveChangeValue > 0) {
        hiveChange.classList.add('positive');
      } else if (hiveChangeValue < 0) {
        hiveChange.classList.add('negative');
      } else {
        hiveChange.classList.add('neutral');
      }
    }

    // Update HBD price
    if (data['hive_dollar']) {
      const hbdData = data['hive_dollar'];
      hbdPrice.textContent = `$${hbdData.usd?.toFixed(3) || '0.000'}`;
      
      const hbdChangeValue = hbdData.usd_24h_change || 0;
      const hbdChangeText = `${hbdChangeValue >= 0 ? '+' : ''}${hbdChangeValue.toFixed(2)}%`;
      hbdChange.textContent = hbdChangeText;
      
      // Apply color classes
      hbdChange.className = 'price-change';
      if (hbdChangeValue > 0) {
        hbdChange.classList.add('positive');
      } else if (hbdChangeValue < 0) {
        hbdChange.classList.add('negative');
      } else {
        hbdChange.classList.add('neutral');
      }
    }
  }

  calculateRechargeTime(votingPower) {
    if (votingPower >= 100) return 'Full';
    
    const powerDeficit = 100 - votingPower;
    const rechargeTimeHours = (powerDeficit / 20) * 24; // 20% per day
    const hours = Math.floor(rechargeTimeHours);
    const minutes = Math.floor((rechargeTimeHours - hours) * 60);
    
    if (hours > 0) {
      return `Full in ${hours} hours ${minutes} minutes`;
    } else {
      return `Full in ${minutes} minutes`;
    }
  }

  getMockDataForUser(username) {
    // Generate realistic mock data based on the username
    const mockUsers = {
      'meno': {
        reputation: 68.25,
        about: 'Age is irrelevant, unless you are a cheese...',
        location: '🔮 Somewhere in the Internets',
        website: 'cordoveguitars.com',
        followers: 4567,
        following: 341,
        votingPower: 74.09,
        voteValue: '0.24',
        effectiveHP: '6,713.44',
        hivePower: '7,226.24',
        receivedDelegation: '0',
        sentDelegation: '512.79',
        powerDownAmount: '0',
        currentVoteValue: '0.05',
        fullVoteValue: '0.06',
        resourceCredits: '10.6',
        rcPercentage: '100.00',
        postCount: 14097,
        wallet: {
          hiveBalance: '123.456',
          stakedHive: '7290.911',
          delegatedHive: '-512.883',
          hiveSavings: '0.000',
          voteEffectiveness: '+2.00 - 1%',
          hbdBalance: '0.264',
          stakedHbd: '0.000',
          hbdSavings: '0.000',
          hbdApr: '15.00',
          accountValue: '1452.78'
        }
      },
      'gtg': {
        reputation: 78.15,
        about: 'Hive witness and developer',
        location: 'Poland',
        website: 'gtg.openhive.network',
        followers: 5432,
        following: 234,
        votingPower: 95.2,
        voteValue: '12.45',
        effectiveHP: '125,000.00',
        hivePower: '130,000.00',
        receivedDelegation: '5,000',
        sentDelegation: '0.00',
        powerDownAmount: '0',
        currentVoteValue: '11.85',
        fullVoteValue: '12.45',
        resourceCredits: '45.2',
        rcPercentage: '100.00',
        postCount: 892,
        wallet: {
          hiveBalance: '2456.789',
          stakedHive: '125000.000',
          delegatedHive: '5000.000',
          hiveSavings: '1000.000',
          voteEffectiveness: '+8.50 - 2%',
          hbdBalance: '567.123',
          stakedHbd: '200.000',
          hbdSavings: '300.000',
          hbdApr: '15.00',
          accountValue: '28456.78'
        }
      }
    };

    const userMock = mockUsers[username.toLowerCase()] || {
      reputation: Math.floor(Math.random() * 30) + 50,
      about: `This is ${username}'s profile`,
      location: 'Unknown',
      website: null,
      followers: Math.floor(Math.random() * 1000) + 100,
      following: Math.floor(Math.random() * 500) + 50,
      votingPower: Math.floor(Math.random() * 30) + 70,
      voteValue: (Math.random() * 5).toFixed(2),
      effectiveHP: (Math.random() * 10000).toFixed(2),
      hivePower: (Math.random() * 12000).toFixed(2),
      receivedDelegation: Math.floor(Math.random() * 1000),
      sentDelegation: (Math.random() * 500).toFixed(2),
      powerDownAmount: '0',
      currentVoteValue: (Math.random() * 0.1).toFixed(3),
      fullVoteValue: (Math.random() * 0.15).toFixed(3),
      resourceCredits: (Math.random() * 20).toFixed(1),
      rcPercentage: '100.00',
      postCount: Math.floor(Math.random() * 1000) + 100,
      wallet: {
        hiveBalance: (Math.random() * 5000).toFixed(3),
        stakedHive: (Math.random() * 25000).toFixed(3),
        delegatedHive: (Math.random() * 3000 - 1500).toFixed(3), // Can be negative
        hiveSavings: (Math.random() * 500).toFixed(3),
        voteEffectiveness: `+${(Math.random() * 5).toFixed(2)} - ${Math.floor(Math.random() * 3) + 1}%`,
        hbdBalance: (Math.random() * 1000).toFixed(3),
        stakedHbd: (Math.random() * 300).toFixed(3),
        hbdSavings: (Math.random() * 150).toFixed(3),
        hbdApr: '15.00',
        accountValue: (Math.random() * 10000).toFixed(2)
      }
    };

    return {
      username: username,
      reputation: userMock.reputation,
      about: userMock.about,
      location: userMock.location,
      website: userMock.website,
      followers: userMock.followers,
      following: userMock.following,
      postCount: userMock.postCount,
      hiveBalance: (Math.random() * 1000).toFixed(3),
      hbdBalance: (Math.random() * 500).toFixed(3),
      vestingShares: (Math.random() * 2000000).toFixed(6),
      voteValue: userMock.voteValue,
      votingPower: userMock.votingPower,
      curationApr: (Math.random() * 10).toFixed(2),
      rechargeTime: this.calculateRechargeTime(userMock.votingPower),
      lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      created: new Date(Date.now() - Math.random() * 1000 * 24 * 60 * 60 * 1000).toISOString(),
      // Stats data
      effectiveHP: userMock.effectiveHP,
      hivePower: userMock.hivePower,
      receivedDelegation: userMock.receivedDelegation,
      sentDelegation: userMock.sentDelegation,
      powerDownAmount: userMock.powerDownAmount,
      currentVoteValue: userMock.currentVoteValue,
      fullVoteValue: userMock.fullVoteValue,
      resourceCredits: userMock.resourceCredits,
      rcPercentage: userMock.rcPercentage,
      rewards: {
        allTime: {
          author: (Math.random() * 50000).toFixed(2),
          curation: (Math.random() * 30000).toFixed(2),
          witness: '0',
          totalHP: (Math.random() * 80000).toFixed(2),
          totalUSD: (Math.random() * 15000).toFixed(2)
        },
        sevenDays: {
          author: (Math.random() * 200).toFixed(2),
          authorHBD: (Math.random() * 50).toFixed(0),
          curation: (Math.random() * 20).toFixed(2),
          witness: '0',
          totalHP: (Math.random() * 220).toFixed(2),
          totalHBD: (Math.random() * 50).toFixed(0),
          totalUSD: (Math.random() * 100).toFixed(2)
        },
        thirtyDays: {
          author: (Math.random() * 800).toFixed(2),
          authorHBD: (Math.random() * 200).toFixed(0),
          curation: (Math.random() * 80).toFixed(2),
          witness: '0',
          totalHP: (Math.random() * 880).toFixed(2),
          totalHBD: (Math.random() * 200).toFixed(0),
          totalUSD: (Math.random() * 400).toFixed(2)
        }
      },
      // Wallet data
      wallet: userMock.wallet || {
        hiveBalance: (Math.random() * 10000).toFixed(3),
        stakedHive: (Math.random() * 50000).toFixed(3),
        delegatedHive: (Math.random() * 5000 - 2500).toFixed(3), // Can be negative (delegated out)
        hiveSavings: (Math.random() * 1000).toFixed(3),
        voteEffectiveness: `+${(Math.random() * 10).toFixed(2)} - ${Math.floor(Math.random() * 5) + 1}%`,
        hbdBalance: (Math.random() * 1000).toFixed(3),
        stakedHbd: (Math.random() * 500).toFixed(3),
        hbdSavings: (Math.random() * 200).toFixed(3),
        hbdApr: '15.00',
        accountValue: (Math.random() * 50000).toFixed(2)
      }
    };
  }

  getMockData(username) {
    // Keep the original test data
    return {
      username: username,
      reputation: 68.25,
      about: 'Age is irrelevant, unless you are a cheese...',
      location: '🔮 Somewhere in the Internets',
      website: 'cordoveguitars.com',
      followers: 1234,
      following: 567,
      postCount: 89,
      hiveBalance: '123.456',
      hbdBalance: '78.901',
      vestingShares: '1234567.123456',
      voteValue: '0.23',
      votingPower: 71.50,
      curationApr: '5.53',
      rechargeTime: 'Full in 1 day 10 hours 11 minutes',
      lastActivity: new Date().toISOString(),
      created: '2021-01-01T00:00:00Z',
      rewards: {
        allTime: {
          author: '29,433.28',
          curation: '18,867.84',
          witness: '0',
          totalHP: '48,301.12',
          totalUSD: '9,628.25'
        },
        sevenDays: {
          author: '158.08',
          authorHBD: '317',
          curation: '7.14',
          witness: '0',
          totalHP: '165.22',
          totalHBD: '317',
          totalUSD: '64.09'
        },
        thirtyDays: {
          author: '158.08',
          authorHBD: '317',
          curation: '7.14',
          witness: '0',
          totalHP: '165.22',
          totalHBD: '317',
          totalUSD: '64.09'
        },
        today: {
          author: '19.15',
          authorHBD: '3.8',
          curation: '1.31',
          witness: '0',
          totalHP: '20.46',
          totalHBD: '3.8',
          totalUSD: '7.85'
        },
        yesterday: {
          author: '29.42',
          authorHBD: '5.87',
          curation: '2.02',
          witness: '0',
          totalHP: '31.44',
          totalHBD: '5.87',
          totalUSD: '12.15'
        }
      }
    };
  }

  displayAccountData(data) {
    const accountData = document.getElementById('accountData');
    
    // Profile Section
    const profileImage = document.getElementById('profileImage');
    const profileName = document.getElementById('profileName');
    const profileHandle = document.getElementById('profileHandle');
    const profileBio = document.getElementById('profileBio');
    const profileLocation = document.getElementById('profileLocation');
    const profileWebsite = document.getElementById('profileWebsite');
    const voteValue = document.getElementById('voteValue');
    const votingPowerFill = document.getElementById('votingPowerFill');
    const votingPowerText = document.getElementById('votingPowerText');
    const rechargeTime = document.getElementById('rechargeTime');
    const curationApr = document.getElementById('curationApr');
    const rewardsData = document.getElementById('rewardsData');
    const statsData = document.getElementById('statsData');

    // Set profile image (default avatar for now)
    profileImage.src = `https://images.hive.blog/u/${data.username}/avatar/large`;
    profileImage.onerror = () => {
      profileImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZjBmMGYwIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzUiIHI9IjE1IiBmaWxsPSIjOTk5Ii8+CjxwYXRoIGQ9Ik0yNSA4NUMyNSA3MCAzNi4xOSA2MCA1MCA2MFM3NSA3MCA3NSA4NSIgZmlsbD0iIzk5OSIvPgo8L3N2Zz4K';
    };

    // Set profile info
    profileName.textContent = data.username;
    profileHandle.textContent = `@${data.username} (${data.reputation})`;
    profileBio.textContent = data.about || 'No bio available';
    
    // Location
    if (data.location) {
      profileLocation.innerHTML = `📍 ${data.location}`;
      profileLocation.style.display = 'block';
    } else {
      profileLocation.style.display = 'none';
    }
    
    // Website
    if (data.website) {
      profileWebsite.innerHTML = `🔗 <a href="${data.website}" target="_blank">${data.website}</a>`;
      profileWebsite.style.display = 'block';
    } else {
      profileWebsite.style.display = 'none';
    }

    // Vote value and voting power
    voteValue.innerHTML = `VOTE VALUE: <strong>$${data.voteValue || '0.00'} (${data.votingPower || 100}%)</strong>`;
    
    const powerPercentage = data.votingPower || 100;
    votingPowerFill.style.width = `${powerPercentage}%`;
    votingPowerText.textContent = `${powerPercentage}%`;
    
    // Recharge time
    rechargeTime.textContent = data.rechargeTime || 'Full in 0 hours 0 minutes';

    // Curation APR
    curationApr.textContent = `Curation APR: ${data.curationApr || '0.00'}%`;

    // Generate last 7 days
    const last7Days = this.generateLast7Days();

    // Rewards table data - All Time, 7 Days, 30 Days, then individual days
    const rewardsRows = [
      {
        period: 'All Time',
        author: `${data.rewards?.allTime?.author || '0.00'} HP`,
        curation: `${data.rewards?.allTime?.curation || '0.00'} HP`,
        witness: `${data.rewards?.allTime?.witness || '0'} HP`,
        total: `${data.rewards?.allTime?.totalHP || '0.00'} HP\n$${data.rewards?.allTime?.totalUSD || '0.00'}`
      },
      {
        period: '7 Days',
        author: `${data.rewards?.sevenDays?.author || '0.00'} HP\n${data.rewards?.sevenDays?.authorHBD || '0.00'} HBD`,
        curation: `${data.rewards?.sevenDays?.curation || '0.00'} HP`,
        witness: `${data.rewards?.sevenDays?.witness || '0'} HP`,
        total: `${data.rewards?.sevenDays?.totalHP || '0.00'} HP\n${data.rewards?.sevenDays?.totalHBD || '0.00'} HBD\n$${data.rewards?.sevenDays?.totalUSD || '0.00'}`
      },
      {
        period: '30 Days',
        author: `${data.rewards?.thirtyDays?.author || '0.00'} HP\n${data.rewards?.thirtyDays?.authorHBD || '0.00'} HBD`,
        curation: `${data.rewards?.thirtyDays?.curation || '0.00'} HP`,
        witness: `${data.rewards?.thirtyDays?.witness || '0'} HP`,
        total: `${data.rewards?.thirtyDays?.totalHP || '0.00'} HP\n${data.rewards?.thirtyDays?.totalHBD || '0.00'} HBD\n$${data.rewards?.thirtyDays?.totalUSD || '0.00'}`
      }
    ];

    // Add individual days for the last 7 days
    last7Days.forEach(day => {
      const dayKey = day.label.toLowerCase().replace(' ', '');
      const dayData = data.rewards?.daily?.[dayKey] || this.generateRandomDayReward();
      
      rewardsRows.push({
        period: day.label,
        author: `${dayData.author || '0.00'} HP\n${dayData.authorHBD || '0.00'} HBD`,
        curation: `${dayData.curation || '0.00'} HP`,
        witness: `${dayData.witness || '0'} HP`,
        total: `${dayData.totalHP || '0.00'} HP\n${dayData.totalHBD || '0.00'} HBD\n$${dayData.totalUSD || '0.00'}`
      });
    });

    rewardsData.innerHTML = rewardsRows.map(row => `
      <div class="rewards-row">
        <div class="period-col">${row.period}</div>
        <div class="author-col">${row.author}</div>
        <div class="curation-col">${row.curation}</div>
        <div class="witness-col">${row.witness}</div>
        <div class="total-col">${row.total}</div>
      </div>
    `).join('');

    // Stats section
    const statsInfo = [
      { label: 'Effective HP', value: `${data.effectiveHP || '0.00'} HP` },
      { label: 'Hive Power', value: `${data.hivePower || '0.00'} HP` },
      { label: 'Received Delegation', value: `${data.receivedDelegation || '0'} HP` },
      { label: 'Sent Delegation', value: `${data.sentDelegation || '0.00'} HP` },
      { label: 'Power Down Amount', value: `${data.powerDownAmount || '0'} HP` },
      { label: 'Current Vote Value', value: `$${data.currentVoteValue || '0.00'} (${data.votingPower || 100}%)` },
      { label: 'Full Vote Value', value: `$${data.fullVoteValue || '0.00'} (100%)` },
      { label: 'Voting Power Full In', value: data.rechargeTime || 'Full' },
      { label: 'Resource Credits', value: `${data.resourceCredits || '0.0'} million RC (${data.rcPercentage || '100.00'}%)` },
      { label: 'Reputation', value: data.reputation || '25.000' },
      { label: 'Followers', value: data.followers || '0' },
      { label: 'Following', value: data.following || '0' },
      { label: 'Posts', value: data.postCount || '0' }
    ];

    statsData.innerHTML = statsInfo.map(stat => `
      <div class="stat-row">
        <div class="stat-label">${stat.label}</div>
        <div class="stat-value">${stat.value}</div>
      </div>
    `).join('');

    // Wallet Section - populate wallet data
    const hiveBalance = document.getElementById('hiveBalance');
    const stakedHive = document.getElementById('stakedHive');
    const delegatedHive = document.getElementById('delegatedHive');
    const hiveSavings = document.getElementById('hiveSavings');
    const voteEffectiveness = document.getElementById('voteEffectiveness');
    const hbdBalance = document.getElementById('hbdBalance');
    const stakedHbd = document.getElementById('stakedHbd');
    const hbdSavings = document.getElementById('hbdSavings');
    const hbdApr = document.getElementById('hbdApr');
    const accountValue = document.getElementById('accountValue');

    // HIVE wallet data
    hiveBalance.textContent = `${data.wallet?.hiveBalance || '0.000'}`;
    stakedHive.textContent = `${data.wallet?.stakedHive || '0.000'}`;
    delegatedHive.textContent = `${data.wallet?.delegatedHive || '0.000'}`;
    hiveSavings.textContent = `${data.wallet?.hiveSavings || '0.000'}`;
    voteEffectiveness.textContent = `${data.wallet?.voteEffectiveness || '+0.00 - 1%'}`;

    // HBD wallet data
    hbdBalance.textContent = `${data.wallet?.hbdBalance || '0.000'}`;
    stakedHbd.textContent = `${data.wallet?.stakedHbd || '0.000'}`;
    hbdSavings.textContent = `${data.wallet?.hbdSavings || '0.000'}`;
    hbdApr.textContent = `${data.wallet?.hbdApr || '15.00'}%`;

    // Account value
    accountValue.textContent = `$ ${data.wallet?.accountValue || '0.00'}`;

    accountData.classList.remove('hidden');
    this.currentAccount = data.username;
  }

  generateRandomDayReward() {
    return {
      author: (Math.random() * 50).toFixed(2),
      authorHBD: (Math.random() * 10).toFixed(1),
      curation: (Math.random() * 5).toFixed(2),
      witness: '0',
      totalHP: (Math.random() * 55).toFixed(2),
      totalHBD: (Math.random() * 10).toFixed(1),
      totalUSD: (Math.random() * 25).toFixed(2)
    };
  }

  showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('accountData').classList.add('hidden');
  }

  hideLoading() {
    document.getElementById('loading').classList.add('hidden');
  }

  showError(message) {
    const errorDiv = document.getElementById('error');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorDiv.classList.remove('hidden');
    document.getElementById('accountData').classList.add('hidden');
  }

  hideError() {
    document.getElementById('error').classList.add('hidden');
  }
}

// Initialize the application
new HiveandMe();
