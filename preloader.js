// progress like preloader component 

// common preloader logic (abstract class)
class BasePreloader {
    constructor(rootDiv) {
        this.rootDiv = rootDiv
        this.init()
        this.onload()
    }

    onload() {
        this.timerId= setInterval(()=>{
            this.step()
            if(this.condition()) {
                clearInterval(this.timerId)
            }
            this.rootDiv.innerHTML = this.render()
        }, /*500*/ this.speed)  // different speed
    }

    //abstract methods 
    condition() {
        throw new ReferenceError("You must implement the condition() method inside the inheriting class")}
        // ReferenceError is thrown if a variable is use but not declared.
    step() {}
    render() {}
    init() {}
}

class ProgressPreloader extends BasePreloader {
    constructor(rootDiv) {
        super(rootDiv)
    }
    //overriding methods
    init() {
        this.progress = 0
        this.speed  = 1500
    }
    condition() {
        return this.progress >= 100
    }
    step() {
        this.progress += 10
    }
    render() {
        return ` ${this.progress}% `
    }
}

class CircularPreloader extends BasePreloader {
    constructor(rootDiv) {
        super(rootDiv)
    }
    init() {
        this.duration = 3000
        this.frames = ['|', '/', '--', '\\']
        this.speed = 1000
    }
    condition() {
        return this.duration <= 0
    }
    step() {
        this.duration -= 250
        let frame = this.frames.shift()
        this.frames.push(frame)
    }
    render() {
        return ` ${this.frames[0]} `
    }
}

class BacwardCircularPreloader extends BasePreloader {
    constructor(rootDiv) {
        super(rootDiv)
    }
    init() {
        this.duration = 3000
        this.frames = ['|', '/', '--', '\\']
        this.speed = 500
    }
    condition() {
        return this.duration <= 0
    }
    step() {
        this.duration -= 250
        // let frame = this.frames.pop()
        // this.frames.unshift(frame)
        let frame = this.frames.splice(0, 1)
        this.frames.splice(3, 1, `${frame}`)


    }
    render() {
        return `[ ${this.frames[0]} ]`
    }
}

class IncompletePreloader extends ProgressPreloader {
    constructor(rootDiv) {
        super(rootDiv)
    }
    condition(){} // override with an empty condition, the timer will not acces the clearInterval and will go forever. 
}
 
///////////////////////////////////////
let p1  = new ProgressPreloader(window['prel-1']);
let p2  = new CircularPreloader(window['prel-2']);
let p3  = new BacwardCircularPreloader(window['prel-3']);
let p4  = new IncompletePreloader(window['prel-4']);