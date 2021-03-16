---
layout: post
title: Code Prinzipien
---

Wenn ich nicht gerade HTML oder CSS programmiere, lege ich den Fokus darauf leicht debugbaren Code zu schreiben.
Ich mag keine verschachtelten Bedingungen oder Schleifen. Damit einher geht, dass ich alles gebe um schnell zu returnen.
Mehrmals verwendeten Code lagere ich in eigene Funktionen aus.
Viele der if / else Bedingungen lassen sich umdrehen. Da im else meistens eh nur returned wird. Es lässt sich also wunderbar das Ergebnis der umgedrehten bedingung returnen. Dann kann ich beim debuggen schneller feststellen, wo ich rausgesprungen bin. Falls doch mal ein if/ else notwendig ist lässt sich das meistens auch wunderbar in Funktionen extrahieren.

Warum ich den Fokus beim schreiben/ refactoren von Code auf debugbarkeit lege? Jeder macht Fehler, aber ich kann es future me wenigstens möglichst leicht machen herauszufinden, wo ich es verkackt habe.

Hier mal ein Code-Beispiel, dass ich Schritt für Schritt refactore. Wirklich viel Sinn ergibt das Beispiel nicht - es ist halt ein Beispiel. Ich denke dennoch, dass es die groben Schritte gut verdeutlicht.

Gehen wir davon aus, dass wir ein Array haben.

```javascript
const list = [
  {
    id: "a",
    items: ["1", "2"]
  },
  {
    id: "b",
    items: ["3", "4", "5"]
  },
  {
    id: "c",
    items: ["6", "7", "8", "9"]
  }
];
```

Dann ist dies der Ausgangscode, der mit dem Array Dinge tut (iteriert und das zweite Kind des ersten Objektes zurückgibt).

```javascript
let foundItem = false;
for (let i = 0; i < list.length; i++) {
  if (!foundItem) {
    const item = list[i];
    if (item.id === "a") {
      const children = item.items;
      for (let c = 0; c < children.length; c++) {
        if (children[c] === "2") {
          foundItem = children[c];
          break;
        } else {
          continue;
        }
      }
    } else {
      continue;
    }
  }
}

console.log(foundItem);  // "2"
```

Im ersten Schritt drehen wir die Bedingungen um:
```javascript
let foundItem = false;
for (let i = 0; i < list.length; i++) {
  if (foundItem) {
    break;
  }

  const item = list[i];
  if (item.id !== "a") {
    continue;
  }

  const children = item.items;
  for (let c = 0; c < children.length; c++) {
    if (children[c] !== "2") {
      continue;
    }

    foundItem = children[c];
    break;
  }
}

console.log(foundItem);  // "2"
```

Dadurch gewinnen wir schon richtig an Lesbarkeit. Auch mit einem Debugger lässt sich da nun viel angenehmer durchsteppen.

Jetzt lösen wir die äußere Schleife auf.
```javascript
let foundItem = false;
const item = list.find((element) => element.id === "a");
const children = item.items;

for (let c = 0; c < children.length; c++) {
  if (item.items[c] !== "2") {
    continue;
  }

  foundItem = children[c];
  break;
}

console.log(foundItem);  // 2
```

Jetzt abstrahieren wir auch noch die innere Schleife weg.
```javascript
const item = list.find((element) => element.id === "a");
const children = item.items;
const foundItem = children.find((element) => element === '2');
console.log(foundItem);  // 2
```

Ganz zum Schluss sparen wir uns dann noch die eine Variablenzuweisung und fertig sind wir.
```javascript
const item = list.find((element) => element.id === "a");
const foundItem = item.items.find((element) => element === '2');
console.log(foundItem);  // 2
```