import React, {Component} from "react"

class MainProgram extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            fontSize: "24",
            randomImg: "https://external-preview.redd.it/jvnDpmaqO-r5IU5j2XgwhblfExiQE36a6iMNA9oblQs.png?auto=webp&s=c89ac763a5c6d380099666bf65fb303d029ce0ee",
            allMemeImgs: [],
            memeOrigName:"pepeHands"
        }
        
    }
    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ allMemeImgs: memes})
            })
    }
    
    handleChange = event => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
    

    
    handleSubmit = event => {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        const memeName = this.state.allMemeImgs[randNum].name 
        this.setState({ randomImg: randMemeImg, memeOrigName: memeName })
    }


    
    render() {
        return (
            <>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />                   
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    /> 
                    <input 
                        className="font-size"
                        type="number"
                        name="fontSize"
                        placeholder=""
                        value={this.state.fontSize}
                        onChange={this.handleChange}
                        style={{width:45,
                        marginLeft:20}}
                    /> 
                    <input 
                        className="color"
                        type="text"
                        name="color"
                        placeholder="Color"
                        value={this.state.color}
                        onChange={this.handleChange}
                        style={{width:60}}
                    /> 
                
                    <button>Make</button> 
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top" 
                        style={{
                            fontSize:this.state.fontSize,
                            color:this.state.color
                        }}
                        >
                        {this.state.topText}
                    </h2>
                    <h2 className="bottom" 
                        style={{
                            fontSize: this.state.fontSize,
                            color:this.state.color
                        }}
                        >
                        {this.state.bottomText}
                    </h2>
                    <div className="tooltip"><i>i</i>  
                        <span className="tooltipText">{this.state.memeOrigName}</span>
                    </div>
                </div>
            </>
        )
    }
}

export default MainProgram