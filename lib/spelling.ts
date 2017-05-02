
interface Counter {
    [key: string]: number;
}

class SpellCorrector {
    private _wordCount: Counter;
    private _nWords: number;
    private readonly _letters: string[];


    constructor(letters: string[],data: Counter) {
      this._letters = letters;
      this._wordCount = data;
      this._nWords = Object.keys(this._wordCount).length;
    }

    correct(word): string {
        if (this._wordCount.hasOwnProperty(word)) return word;

        const validWords: string[] = this._computeEdits2(word)
            .filter(w => this._wordCount.hasOwnProperty(w));

        const probabilities = validWords.map(w => (this._wordCount[w] + 1) / this._nWords );

        const index = this._indexOfMaximum(probabilities);


        return validWords[index];

    }
    

    private _indexOfMaximum(list: number[]) {
        return list.reduce(
            (bestIndexSoFar, currentlyTestedValue, currentlyTestedIndex) =>
                currentlyTestedValue > list[bestIndexSoFar] ? currentlyTestedIndex : bestIndexSoFar, 0);
    }

    private _computeEdits1(word: string): string[] {
        let edits: string[] = [];
        const addToEdits = (candidate) => (edits.indexOf(candidate) === -1) ? edits.push(candidate): null;

        // delete
        for (let i = 0; i < word.length; i++) {
            addToEdits(word.slice(0, i) + word.slice(i + 1));
        }


        // transpose
        for (let i = 0; i < word.length - 1; i++) {
            addToEdits(word.slice(0, i) + word.slice(i + 1, i + 2) + word.slice(i, i + 1) + word.slice(i + 2));
        }


        // alter
        for (let i = 0; i < word.length; i++) {
            this._letters.forEach(l => addToEdits(word.slice(0, i) + l + word.slice(i + 1)));
        }

        // insert
        for (let i = 0; i <= word.length; i++) {
            this._letters.forEach(l => addToEdits(word.slice(0, i) + l + word.slice(i)));
        }
        return edits;
    }

     _computeEdits2(word: string): string[] {
        return this._computeEdits1(word)
            .map(edit => this._computeEdits1(edit))
            .reduce((previous: string[], current: string[]) => {
                return previous.concat(current);
            }, []);
    }
}

/*
    var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    var corrector = new SpellCorrector(letters);
    corrector.loadCounts('word_counts.json', (err) => {
        if (err) throw err;
        
        console.log(corrector.correct('speling'));
    });
*/
