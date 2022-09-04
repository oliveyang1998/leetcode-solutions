const { readdirSync } = require('fs');
const fs = require('fs');
const path = require('path');

const IGNORE_DIRS = ['.github', '.git'];
const FOLDER_TO_LANG = {
    javascript: 'JS',
    typescript: 'TS',
    csharp: 'C#',
    c: 'C',
    go: 'GO',
    java: 'Java',
    python: 'Python',
    ruby: 'Ruby',
    rust: 'Rust',
    scala: 'Scala',
    swift: 'Swift',
    cpp: 'C++',
    kotlin: 'Kotlin',
};
const PREPEND_PATH = process.argv[2] || './';
const TEMPLATE_PATH = process.argv[3] || './.github/README_template.md';
const WRITE_PATH = process.argv[3] || './README.md';

const PROBLEM_LISTS = {
    'NeetCode 150': [
        ['Contains Duplicate', '217'],
        ['Valid Anagram', '242'],
        ['Two Sum', '1'],
        ['Group Anagrams', '49'],
        ['Top K Frequent Elements', '347'],
        ['Product of Array Except Self', '238'],
        ['Valid Sudoku', '36'],
        ['Encode and Decode Strings', '271'],
        ['Longest Consecutive Sequence', '128'],
        ['Valid Palindrome', '125'],
        ['Two Sum II', '167'],
        ['3Sum', '15'],
        ['Container with Most Water', '11'],
        ['Trapping Rain Water', '42'],
        ['Best Time to Buy & Sell Stock', '121'],
        ['Longest Substring Without Repeating Characters', '3'],
        ['Longest Repeating Character Replacement', '424'],
        ['Permutation in String', '567'],
        ['Minimum Window Substring', '76'],
        ['Sliding Window Maximum', '239'],
        ['Valid Parentheses', '20'],
        ['Min Stack', '155'],
        ['Evaluate Reverse Polish Notation', '150'],
        ['Generate Parentheses', '22'],
        ['Daily Temperatures', '739'],
        ['Car Fleet', '853'],
        ['Largest Rectangle in Histogram', '84'],
        ['Binary Search', '704'],
        ['Search a 2D Matrix', '74'],
        ['Koko Eating Bananas', '875'],
        ['Search Rotated Sorted Array', '33'],
        ['Find Minimum in Rotated Sorted Array', '153'],
        ['Time Based Key-Value Store', '981'],
        ['Find Median of Two Sorted Arrays', '4'],
        ['Reverse Linked List', '206'],
        ['Merge Two Linked Lists', '21'],
        ['Reorder List', '143'],
        ['Remove Nth Node from End of List', '19'],
        ['Copy List with Random Pointer', '138'],
        ['Add Two Numbers', '2'],
        ['Linked List Cycle', '141'],
        ['Find the Duplicate Number', '287'],
        ['LRU Cache', '146'],
        ['Merge K Sorted Lists', '23'],
        ['Reverse Nodes in K-Group', '25'],
        ['Invert Binary Tree', '226'],
        ['Maximum Depth of Binary Tree', '104'],
        ['Diameter of a Binary Tree', '543'],
        ['Balanced Binary Tree', '110'],
        ['Same Tree', '100'],
        ['Subtree of Another Tree', '572'],
        ['Lowest Common Ancestor of a BST', '235'],
        ['Binary Tree Level Order Traversal', '102'],
        ['Binary Tree Right Side View', '199'],
        ['Count Good Nodes in a Binary Tree', '1448'],
        ['Validate Binary Search Tree', '98'],
        ['Kth Smallest Element in a BST', '230'],
        ['Construct Tree from Preorder and Inorder Traversal', '105'],
        ['Binary Tree Max Path Sum', '124'],
        ['Serialize and Deserialize Binary Tree', '297'],
        ['Implement Trie', '208'],
        ['Design Add and Search Word Data Structure', '211'],
        ['Word Search II', '212'],
        ['Kth Largest Element in a Stream', '703'],
        ['Last Stone Weight', '1046'],
        ['K Closest Points to Origin', '973'],
        ['Kth Largest Element in an Array', '215'],
        ['Task Scheduler', '621'],
        ['Design Twitter', '355'],
        ['Find Median from Data Stream', '295'],
        ['Subsets', '78'],
        ['Combination Sum', '39'],
        ['Permutations', '46'],
        ['Subsets II', '90'],
        ['Combination Sum II', '40'],
        ['Word Search', '79'],
        ['Palindrome Partitioning', '131'],
        ['Letter Combinations of a Phone Number', '17'],
        ['N-Queens', '51'],
        ['Number of Islands', '200'],
        ['Clone Graph', '133'],
        ['Max Area of Island', '695'],
        ['Pacific Atlantic Waterflow', '417'],
        ['Surrounded Regions', '130'],
        ['Rotting Oranges', '994'],
        ['Walls and Gates', '286'],
        ['Course Schedule', '207'],
        ['Course Schedule II', '210'],
        ['Redundant Connection', '684'],
        ['Number of Connected Components in Graph', '323'],
        ['Graph Valid Tree', '261'],
        ['Word Ladder', '127'],
        ['Reconstruct Itinerary', '332'],
        ['Min Cost to Connect all Points', '1584'],
        ['Network Delay Time', '743'],
        ['Swim in Rising Water', '778'],
        ['Alien Dictionary', '269'],
        ['Cheapest Flights Within K Stops', '787'],
        ['Climbing Stairs', '70'],
        ['Min Cost Climbing Stairs', '746'],
        ['House Robber', '198'],
        ['House Robber II', '213'],
        ['Longest Palindromic Substring', '5'],
        ['Palindromic Substrings', '647'],
        ['Decode Ways', '91'],
        ['Coin Change', '322'],
        ['Maximum Product Subarray', '152'],
        ['Word Break', '139'],
        ['Longest Increasing Subsequence', '300'],
        ['Partition Equal Subset Sum', '416'],
        ['Unique Paths', '62'],
        ['Longest Common Subsequence', '1143'],
        ['Best Time to Buy/Sell Stock With Cooldown', '309'],
        ['Coin Change II', '518'],
        ['Target Sum', '494'],
        ['Interleaving String', '97'],
        ['Longest Increasing Path in a Matrix', '329'],
        ['Distinct Subsequences', '115'],
        ['Edit Distance', '72'],
        ['Burst Balloons', '312'],
        ['Regular Expression Matching', '10'],
        ['Maximum Subarray', '53'],
        ['Jump Game', '55'],
        ['Jump Game II', '45'],
        ['Gas Station', '134'],
        ['Hand of Straights', '846'],
        ['Merge Triplets to Form Target Triplet', '1899'],
        ['Partition Labels', '763'],
        ['Valid Parenthesis String', '678'],
        ['Insert Interval', '57'],
        ['Merge Intervals', '56'],
        ['Non-Overlapping Intervals', '435'],
        ['Meeting Rooms', '252'],
        ['Meeting Rooms II', '253'],
        ['Minimum Interval to Include Each Query', '1851'],
        ['Rotate Image', '48'],
        ['Spiral Matrix', '54'],
        ['Set Matrix Zeroes', '73'],
        ['Happy Number', '202'],
        ['Plus One', '66'],
        ['Pow(x, n)', '50'],
        ['Multiply Strings', '43'],
        ['Detect Squares', '2013'],
        ['Single Number', '136'],
        ['Number of 1 Bits', '191'],
        ['Counting Bits', '338'],
        ['Reverse Bits', '190'],
        ['Missing Number', '268'],
        ['Sum of Two Integers', '371'],
        ['Reverse Integer', '7'],
    ],
    'Blind 75': [
        ['Contains Duplicate', '217'],
        ['Valid Anagram', '242'],
        ['Two Sum', '1'],
        ['Group Anagrams', '49'],
        ['Top K Frequent Elements', '347'],
        ['Product of Array Except Self', '238'],
        ['Encode and Decode Strings', '271'],
        ['Longest Consecutive Sequence', '128'],
        ['Valid Palindrome', '125'],
        ['3Sum', '15'],
        ['Container with Most Water', '11'],
        ['Best Time to Buy & Sell Stock', '121'],
        ['Longest Substring Without Repeating Characters', '3'],
        ['Longest Repeating Character Replacement', '424'],
        ['Minimum Window Substring', '76'],
        ['Valid Parentheses', '20'],
        ['Search Rotated Sorted Array', '33'],
        ['Find Minimum in Rotated Sorted Array', '153'],
        ['Reverse Linked List', '206'],
        ['Merge Two Linked Lists', '21'],
        ['Reorder List', '143'],
        ['Remove Nth Node from End of List', '19'],
        ['Linked List Cycle', '141'],
        ['Merge K Sorted Lists', '23'],
        ['Invert Binary Tree', '226'],
        ['Maximum Depth of Binary Tree', '104'],
        ['Same Tree', '100'],
        ['Subtree of Another Tree', '572'],
        ['Lowest Common Ancestor of a BST', '235'],
        ['Binary Tree Level Order Traversal', '102'],
        ['Validate Binary Search Tree', '98'],
        ['Kth Smallest Element in a BST', '230'],
        ['Construct Tree from Preorder and Inorder Traversal', '105'],
        ['Binary Tree Max Path Sum', '124'],
        ['Serialize and Deserialize Binary Tree', '297'],
        ['Implement Trie', '208'],
        ['Design Add and Search Word Data Structure', '211'],
        ['Word Search II', '212'],
        ['Find Median from Data Stream', '295'],
        ['Combination Sum', '39'],
        ['Word Search', '79'],
        ['Number of Islands', '200'],
        ['Clone Graph', '133'],
        ['Pacific Atlantic Waterflow', '417'],
        ['Course Schedule', '207'],
        ['Number of Connected Components in Graph', '323'],
        ['Graph Valid Tree', '261'],
        ['Alien Dictionary', '269'],
        ['Climbing Stairs', '70'],
        ['House Robber', '198'],
        ['House Robber II', '213'],
        ['Longest Palindromic Substring', '5'],
        ['Palindromic Substrings', '647'],
        ['Decode Ways', '91'],
        ['Coin Change', '322'],
        ['Maximum Product Subarray', '152'],
        ['Word Break', '139'],
        ['Longest Increasing Subsequence', '300'],
        ['Unique Paths', '62'],
        ['Longest Common Subsequence', '1143'],
        ['Maximum Subarray', '53'],
        ['Jump Game', '55'],
        ['Insert Interval', '57'],
        ['Merge Intervals', '56'],
        ['Non-Overlapping Intervals', '435'],
        ['Meeting Rooms', '252'],
        ['Meeting Rooms II', '253'],
        ['Rotate Image', '48'],
        ['Spiral Matrix', '54'],
        ['Set Matrix Zeroes', '73'],
        ['Number of 1 Bits', '191'],
        ['Counting Bits', '338'],
        ['Reverse Bits', '190'],
        ['Missing Number', '268'],
        ['Sum of Two Integers', '371'],
    ],
};
delete PROBLEM_LISTS['Blind 75'];

const URLS = {
    'NeetCode 150': [
        'https://leetcode.com/problems/contains-duplicate/',
        'https://leetcode.com/problems/valid-anagram/',
        'https://leetcode.com/problems/two-sum/',
        'https://leetcode.com/problems/group-anagrams/',
        'https://leetcode.com/problems/top-k-frequent-elements/',
        'https://leetcode.com/problems/product-of-array-except-self/',
        'https://leetcode.com/problems/valid-sudoku/',
        'https://leetcode.com/problems/encode-and-decode-strings/',
        'https://leetcode.com/problems/longest-consecutive-sequence/',
        'https://leetcode.com/problems/valid-palindrome/',
        'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
        'https://leetcode.com/problems/3sum/',
        'https://leetcode.com/problems/container-with-most-water/',
        'https://leetcode.com/problems/trapping-rain-water/',
        'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
        'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        'https://leetcode.com/problems/longest-repeating-character-replacement/',
        'https://leetcode.com/problems/permutation-in-string/',
        'https://leetcode.com/problems/minimum-window-substring/',
        'https://leetcode.com/problems/sliding-window-maximum/',
        'https://leetcode.com/problems/valid-parentheses/',
        'https://leetcode.com/problems/min-stack/',
        'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
        'https://leetcode.com/problems/generate-parentheses/',
        'https://leetcode.com/problems/daily-temperatures/',
        'https://leetcode.com/problems/car-fleet/',
        'https://leetcode.com/problems/largest-rectangle-in-histogram/',
        'https://leetcode.com/problems/binary-search/',
        'https://leetcode.com/problems/search-a-2d-matrix/',
        'https://leetcode.com/problems/koko-eating-bananas/',
        'https://leetcode.com/problems/search-in-rotated-sorted-array/',
        'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
        'https://leetcode.com/problems/time-based-key-value-store/',
        'https://leetcode.com/problems/median-of-two-sorted-arrays/',
        'https://leetcode.com/problems/reverse-linked-list/',
        'https://leetcode.com/problems/merge-two-sorted-lists/',
        'https://leetcode.com/problems/reorder-list/',
        'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
        'https://leetcode.com/problems/copy-list-with-random-pointer/',
        'https://leetcode.com/problems/add-two-numbers/',
        'https://leetcode.com/problems/linked-list-cycle/',
        'https://leetcode.com/problems/find-the-duplicate-number/',
        'https://leetcode.com/problems/lru-cache/',
        'https://leetcode.com/problems/merge-k-sorted-lists/',
        'https://leetcode.com/problems/reverse-nodes-in-k-group/',
        'https://leetcode.com/problems/invert-binary-tree/',
        'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
        'https://leetcode.com/problems/diameter-of-binary-tree/',
        'https://leetcode.com/problems/balanced-binary-tree/',
        'https://leetcode.com/problems/same-tree/',
        'https://leetcode.com/problems/subtree-of-another-tree/',
        'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
        'https://leetcode.com/problems/binary-tree-level-order-traversal/',
        'https://leetcode.com/problems/binary-tree-right-side-view/',
        'https://leetcode.com/problems/count-good-nodes-in-binary-tree/',
        'https://leetcode.com/problems/validate-binary-search-tree/',
        'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
        'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
        'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
        'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
        'https://leetcode.com/problems/implement-trie-prefix-tree/',
        'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
        'https://leetcode.com/problems/word-search-ii/',
        'https://leetcode.com/problems/kth-largest-element-in-a-stream/',
        'https://leetcode.com/problems/last-stone-weight/',
        'https://leetcode.com/problems/k-closest-points-to-origin/',
        'https://leetcode.com/problems/kth-largest-element-in-an-array/',
        'https://leetcode.com/problems/task-scheduler/',
        'https://leetcode.com/problems/design-twitter/',
        'https://leetcode.com/problems/find-median-from-data-stream/',
        'https://leetcode.com/problems/subsets/',
        'https://leetcode.com/problems/combination-sum/',
        'https://leetcode.com/problems/permutations/',
        'https://leetcode.com/problems/subsets-ii/',
        'https://leetcode.com/problems/combination-sum-ii/',
        'https://leetcode.com/problems/word-search/',
        'https://leetcode.com/problems/palindrome-partitioning/',
        'https://leetcode.com/problems/letter-combinations-of-a-phone-number/',
        'https://leetcode.com/problems/n-queens/',
        'https://leetcode.com/problems/number-of-islands/',
        'https://leetcode.com/problems/clone-graph/',
        'https://leetcode.com/problems/max-area-of-island/',
        'https://leetcode.com/problems/pacific-atlantic-water-flow/',
        'https://leetcode.com/problems/surrounded-regions/',
        'https://leetcode.com/problems/rotting-oranges/',
        'https://leetcode.com/problems/walls-and-gates/',
        'https://leetcode.com/problems/course-schedule/',
        'https://leetcode.com/problems/course-schedule-ii/',
        'https://leetcode.com/problems/redundant-connection/',
        'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/',
        'https://leetcode.com/problems/graph-valid-tree/',
        'https://leetcode.com/problems/word-ladder/',
        'https://leetcode.com/problems/reconstruct-itinerary/',
        'https://leetcode.com/problems/min-cost-to-connect-all-points/',
        'https://leetcode.com/problems/network-delay-time/',
        'https://leetcode.com/problems/swim-in-rising-water/',
        'https://leetcode.com/problems/alien-dictionary/',
        'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
        'https://leetcode.com/problems/climbing-stairs/',
        'https://leetcode.com/problems/min-cost-climbing-stairs/',
        'https://leetcode.com/problems/house-robber/',
        'https://leetcode.com/problems/house-robber-ii/',
        'https://leetcode.com/problems/longest-palindromic-substring/',
        'https://leetcode.com/problems/palindromic-substrings/',
        'https://leetcode.com/problems/decode-ways/',
        'https://leetcode.com/problems/coin-change/',
        'https://leetcode.com/problems/maximum-product-subarray/',
        'https://leetcode.com/problems/word-break/',
        'https://leetcode.com/problems/longest-increasing-subsequence/',
        'https://leetcode.com/problems/partition-equal-subset-sum/',
        'https://leetcode.com/problems/unique-paths/',
        'https://leetcode.com/problems/longest-common-subsequence/',
        'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/',
        'https://leetcode.com/problems/coin-change-2/',
        'https://leetcode.com/problems/target-sum/',
        'https://leetcode.com/problems/interleaving-string/',
        'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/',
        'https://leetcode.com/problems/distinct-subsequences/',
        'https://leetcode.com/problems/edit-distance/',
        'https://leetcode.com/problems/burst-balloons/',
        'https://leetcode.com/problems/regular-expression-matching/',
        'https://leetcode.com/problems/maximum-subarray/',
        'https://leetcode.com/problems/jump-game/',
        'https://leetcode.com/problems/jump-game-ii/',
        'https://leetcode.com/problems/gas-station/',
        'https://leetcode.com/problems/hand-of-straights/',
        'https://leetcode.com/problems/merge-triplets-to-form-target-triplet/',
        'https://leetcode.com/problems/partition-labels/',
        'https://leetcode.com/problems/valid-parenthesis-string/',
        'https://leetcode.com/problems/insert-interval/',
        'https://leetcode.com/problems/merge-intervals/',
        'https://leetcode.com/problems/non-overlapping-intervals/',
        'https://leetcode.com/problems/meeting-rooms/',
        'https://leetcode.com/problems/meeting-rooms-ii/',
        'https://leetcode.com/problems/minimum-interval-to-include-each-query/',
        'https://leetcode.com/problems/rotate-image/',
        'https://leetcode.com/problems/spiral-matrix/',
        'https://leetcode.com/problems/set-matrix-zeroes/',
        'https://leetcode.com/problems/happy-number/',
        'https://leetcode.com/problems/plus-one/',
        'https://leetcode.com/problems/powx-n/',
        'https://leetcode.com/problems/multiply-strings/',
        'https://leetcode.com/problems/detect-squares/',
        'https://leetcode.com/problems/single-number/',
        'https://leetcode.com/problems/number-of-1-bits/',
        'https://leetcode.com/problems/counting-bits/',
        'https://leetcode.com/problems/reverse-bits/',
        'https://leetcode.com/problems/missing-number/',
        'https://leetcode.com/problems/sum-of-two-integers/',
        'https://leetcode.com/problems/reverse-integer/',
    ],
    'Blind 75': [
        'https://leetcode.com/problems/contains-duplicate/',
        'https://leetcode.com/problems/valid-anagram/',
        'https://leetcode.com/problems/two-sum/',
        'https://leetcode.com/problems/group-anagrams/',
        'https://leetcode.com/problems/top-k-frequent-elements/',
        'https://leetcode.com/problems/product-of-array-except-self/',
        'https://leetcode.com/problems/encode-and-decode-strings/',
        'https://leetcode.com/problems/longest-consecutive-sequence/',
        'https://leetcode.com/problems/valid-palindrome/',
        'https://leetcode.com/problems/3sum/',
        'https://leetcode.com/problems/container-with-most-water/',
        'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
        'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        'https://leetcode.com/problems/longest-repeating-character-replacement/',
        'https://leetcode.com/problems/minimum-window-substring/',
        'https://leetcode.com/problems/valid-parentheses/',
        'https://leetcode.com/problems/search-in-rotated-sorted-array/',
        'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
        'https://leetcode.com/problems/reverse-linked-list/',
        'https://leetcode.com/problems/merge-two-sorted-lists/',
        'https://leetcode.com/problems/reorder-list/',
        'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
        'https://leetcode.com/problems/linked-list-cycle/',
        'https://leetcode.com/problems/merge-k-sorted-lists/',
        'https://leetcode.com/problems/invert-binary-tree/',
        'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
        'https://leetcode.com/problems/same-tree/',
        'https://leetcode.com/problems/subtree-of-another-tree/',
        'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
        'https://leetcode.com/problems/binary-tree-level-order-traversal/',
        'https://leetcode.com/problems/validate-binary-search-tree/',
        'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
        'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
        'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
        'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
        'https://leetcode.com/problems/implement-trie-prefix-tree/',
        'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
        'https://leetcode.com/problems/word-search-ii/',
        'https://leetcode.com/problems/find-median-from-data-stream/',
        'https://leetcode.com/problems/combination-sum/',
        'https://leetcode.com/problems/word-search/',
        'https://leetcode.com/problems/number-of-islands/',
        'https://leetcode.com/problems/clone-graph/',
        'https://leetcode.com/problems/pacific-atlantic-water-flow/',
        'https://leetcode.com/problems/course-schedule/',
        'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/',
        'https://leetcode.com/problems/graph-valid-tree/',
        'https://leetcode.com/problems/alien-dictionary/',
        'https://leetcode.com/problems/climbing-stairs/',
        'https://leetcode.com/problems/house-robber/',
        'https://leetcode.com/problems/house-robber-ii/',
        'https://leetcode.com/problems/longest-palindromic-substring/',
        'https://leetcode.com/problems/palindromic-substrings/',
        'https://leetcode.com/problems/decode-ways/',
        'https://leetcode.com/problems/coin-change/',
        'https://leetcode.com/problems/maximum-product-subarray/',
        'https://leetcode.com/problems/word-break/',
        'https://leetcode.com/problems/longest-increasing-subsequence/',
        'https://leetcode.com/problems/unique-paths/',
        'https://leetcode.com/problems/longest-common-subsequence/',
        'https://leetcode.com/problems/maximum-subarray/',
        'https://leetcode.com/problems/jump-game/',
        'https://leetcode.com/problems/insert-interval/',
        'https://leetcode.com/problems/merge-intervals/',
        'https://leetcode.com/problems/non-overlapping-intervals/',
        'https://leetcode.com/problems/meeting-rooms/',
        'https://leetcode.com/problems/meeting-rooms-ii/',
        'https://leetcode.com/problems/rotate-image/',
        'https://leetcode.com/problems/spiral-matrix/',
        'https://leetcode.com/problems/set-matrix-zeroes/',
        'https://leetcode.com/problems/number-of-1-bits/',
        'https://leetcode.com/problems/counting-bits/',
        'https://leetcode.com/problems/reverse-bits/',
        'https://leetcode.com/problems/missing-number/',
        'https://leetcode.com/problems/sum-of-two-integers/',
    ],
};
delete URLS['Blind 75'];

const getDirectories = (source) =>
    readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

function* walkSync(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            yield* walkSync(path.join(dir, file.name));
        } else {
            yield path.join(dir, file.name);
        }
    }
}

function nestedFiles(dir) {
    files = [];
    for (const filePath of walkSync(dir)) {
        files.push(filePath);
    }
    return files;
}

const buildTableColumn = (
    language,
    problems,
    tableMatrix,
    directory = False
) => {
    directory = directory || language;
    let files = nestedFiles(directory);
    let checkbox = problems.reduce((acc, [, number]) => {
        acc[number] = false;
        return acc;
    }, {});

    for (const file of files) {
        const fileNumber = file.match(/\d+/)[0];
        if (checkbox[fileNumber] !== undefined) checkbox[fileNumber] = true;
    }

    tableMatrix[0].push(language);
    for (const [index, [, problemNumber]] of Object.entries(
        Object.values(problems)
    )) {
        tableMatrix[+index + 1].push(checkbox[problemNumber]);
    }
};

const makeMarkdown = (table, urls) => {
    return [
        table[0]
            .map((cell) => `<sub>${FOLDER_TO_LANG[cell] || cell}</sub>`)
            .join(' | '),
        table[0].map(() => '----').join(' | '),
        ...table.slice(1).map((row, rowIndex) =>
            row
                .map((cell, index) => {
                    if (index == 0)
                        return `<sub>[${cell}](${urls[rowIndex]})</sub>`;
                    return `<sub><div align='center'>${
                        cell ? '✔️' : '❌'
                    }</div></sub>`;
                })
                .join(' | ')
        ),
    ].join('\n');
};

const tables = {};
Object.entries(PROBLEM_LISTS).forEach(([name, list]) => {
    tables[name] = Array.from({ length: list.length + 1 }, (item, index) => {
        if (index == 0) return ['Problem'];
        return [`${list[index - 1][1]} - ${list[index - 1][0]}`];
    });
});

let outputMarkdownTable = '';
for (const key in tables) {
    getDirectories(PREPEND_PATH)
        .filter((dir) => !IGNORE_DIRS.includes(dir))
        .forEach((language) => {
            buildTableColumn(
                language,
                PROBLEM_LISTS[key],
                tables[key],
                PREPEND_PATH + language
            );
        });
    tables[key] = makeMarkdown(tables[key], URLS[key]);

    // console.log(`##### ${key}`);
    outputMarkdownTable += `\n${tables[key]}`;
}

const template = fs.readFileSync(TEMPLATE_PATH, { encoding: 'utf8' })

const full = template
    .replaceAll('<completion-table />', outputMarkdownTable);

console.log(full)
fs.writeFileSync(WRITE_PATH, full, {
    encoding: 'utf8',
});
