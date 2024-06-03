const treasureData = [
    {
        number: 1,
        address: "QawZxUMXSDRuJryi6kRrzvJ7c6oPeNtHLZ",
        link: "qortal://APP/Q-Toons",
        clue: "Check your email, but no abbreviations"
    },
    {
        number: 2,
        address: "Qc7aLCxw88hDaiRoVMXxPm9bHi85SXG11Q",
        link: "qortal://APP/GameOfLife",
        clue: "To Follow the White Rabbit, you need its address"
    },
    {
        number: 3,
        address: "QNAGY9CpCc4hiPn1cpjmBVMNoarJpD9h6J",
        link: "qortal://APP/TreasureHunt",
        clue: "You're already here, but where is that?"
    }
];

const treasureList = document.getElementById("treasureList");

function fetchBalance(address) {
    return fetch(`/addresses/balance/${address}`)
        .then(response => response.json());
}

function createTreasureItem(treasure) {
    const treasureItem = document.createElement("div");
    treasureItem.className = "treasure-item";

    const treasureNumber = document.createElement("div");
    treasureNumber.className = "treasure-number";
    treasureNumber.textContent = `Hidden Treasure #${treasure.number}`;
    treasureItem.appendChild(treasureNumber);

    const treasureLink = document.createElement("div");
    treasureLink.className = "treasure-link";
    treasureLink.innerHTML = `Seedphrase Location: <a href="${treasure.link}">${treasure.link}</a>`;
    treasureItem.appendChild(treasureLink);

    const treasureClue = document.createElement("div");
    treasureClue.className = "treasure-clue";
    treasureClue.textContent = `Clue: ${treasure.clue}`;
    treasureItem.appendChild(treasureClue);

    const treasureBalance = document.createElement("div");
    treasureBalance.className = "treasure-balance";
    treasureItem.appendChild(treasureBalance);

    fetchBalance(treasure.address)
        .then(balance => {
            if (balance > 0) {
                treasureBalance.textContent = `Treasure Value: ${balance} QORT`;
            } else {
                treasureBalance.className = "treasure-claimed";
                treasureBalance.textContent = `Treasure Claimed!`;
            }
        });

    return treasureItem;
}

treasureData.forEach(treasure => {
    const treasureItem = createTreasureItem(treasure);
    treasureList.appendChild(treasureItem);
});