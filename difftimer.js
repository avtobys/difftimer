class DiffTimer {
    constructor(datetime) {
        this.datetime = datetime;
        this.parse = Date.parse(datetime);
        this.diffSeconds = Math.ceil((Date.now() - this.parse) / 1000);
        this.parsed = this.parser(this.diffSeconds);
    }

    parser(diffSeconds) {
        if (diffSeconds < 10) {
            return "только что";
        }
        if (diffSeconds < 60) {
            return this.n2str(diffSeconds, "s") + " назад";
        }
        if (diffSeconds < 3600) {
            let n = Math.round(diffSeconds / 60);
            return this.n2str(n, "m") + " назад";
        }
        if (diffSeconds < 86400) {
            let n = Math.round(diffSeconds / 3600);
            return this.n2str(n, "h") + " назад";
        }
        if (diffSeconds < 86400 * 7) {
            let n = Math.round(diffSeconds / 86400);
            return this.n2str(n, "d") + " назад";
        }
        if (diffSeconds < 86400 * 30) {
            let n = Math.round(diffSeconds / (86400 * 7));
            return this.n2str(n, "n") + " назад";
        }
        if (diffSeconds < 86400 * 335) {
            let n = Math.round(diffSeconds / (86400 * 30));
            return this.n2str(n, "M") + " назад";
        }
        let n = Math.round(diffSeconds / (86400 * 365));
        return this.n2str(n, "y") + " назад";
    }

    n2str(n, type) {
        let t = {
            "s": ["секунду", "секунды", "секунд"],
            "m": ["минуту", "минуты", "минут"],
            "h": ["час", "часа", "часов"],
            "d": ["день", "дня", "дней"],
            "n": ["неделю", "недели", "недель"],
            "M": ["месяц", "месяца", "месяцев"],
            "y": ["год", "года", "лет"]
        }
        let s1 = n.toString().substr(-1);
        let s2 = n.toString().substr(-2);
        n = n == 1 ? "" : n + " ";
        if (s1 == 1 && s2 != 11) {
            return n + t[type][0];
        }
        if ([2, 3, 4].includes(~~s1) && ![12, 13, 14].includes(~~s2)) {
            return n + t[type][1];
        }
        return n + t[type][2];

    }
}

console.log(new DiffTimer('2021-04-25 2:17:56').parsed);
