curl = require('curl')
jsonfile = require('jsonfile')
async = require('async')

defaultOptions = {
  headers: {
    'User-Agent': 'github-crawler'
  }
}
defaultQueryParams = '&sort=created&order=asc'

// 1. SEARCH BY PHRASES
var PHRASES = [
  'token+generation',
  'token+allocation',
  'ico+smart+contract',
  'smart+contract+builder',
  'blockchain',
  'ethereum',
  'solidity',
  'ERC20'
]

async.each(PHRASES,
  (phrase, callback) => {
    curl.get(`https://api.github.com/search/repositories?q=${phrase}${defaultQueryParams}`,
      Object.assign(defaultOptions, {}),
      (err, response, body) => {
        body = JSON.parse(body)
        if(!body.message) {
          for(item of body.items) {
            jsonfile.writeFileSync(`logs/log_${phrase}.txt`, {
              id: item.id,
              name: item.name,
              html_url: item.html_url,
              created_at: item.created_at,
              updated_at: item.updated_at,
              open_issues_count: item.open_issues_count,
              forks_count: item.forks_count,
              watchers: item.watchers,
              score: item.score
            }, {flag: 'a'})
          }
        } else {
          console.log(body.message)
        }
    })
  },
  (a,b) => {
    console.log(a,b)
  }
)

// TODO: UPGRADES
// 1. LIMIT DATA BY DATE RANGE
// 2. SEARCH BY SOLIDITY files
//3. SEARCH BY COMMIT TEXT
//4.  GET ADDITIONAL DATA
// # Solidity (or NEO etc) files
// # issues
// # commits
