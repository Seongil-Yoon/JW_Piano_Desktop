Vue.component('keyboard-component', {
    props: ['global'],
    mounted()
     {
       this.keyboard = create_keyboard()
       setNoteHanlder(this)
       this.handle_keyboard_click()
    },
    data: function () 
    {
       return {
        keyboard: [],
        key_mapping: {}
       }
   },
    methods: {
     refresh()
     {
        for(const key of this.keyboard.values())
        {
            key.className = key.className.replace(" note-on", "");
        }
     },
     handle_keyboard_click()
     {
        let id = undefined;
        window.addEventListener('keydown', (e) => 
        {
           console.log(e, this.global.keyboard_mapping)
           if(e.location == 3){
                // Kalimba scale
                // 3 is Numpad area
                if(e.ctrlKey == true){
                    // when press Ctrl
                    id = this.global.keyboard_mapping["Ctrl" + "+" + e.code];
                }else if(e.key == "End"){
                    id = this.global.keyboard_mapping["Shift" + "+" + e.code];
                }else if(e.key == "ArrowDown"){
                    id = this.global.keyboard_mapping["Shift" + "+" + e.code];
                }else if(e.key == "PageDown"){
                    id = this.global.keyboard_mapping["Shift" + "+" + e.code];
                }else{
                    id = this.global.keyboard_mapping[e.code];
                }
           }else{
               id = this.global.keyboard_mapping[e.code];
           }
           if(id == null)
           {
            return
           }
           this.handle_click(id)
           this.handle_note_event(id,100)

        });
     },
     handle_click(index)
     {
        publichNodeEvent(0,index, 100);
        setTimeout(e =>{ publichNodeEvent(0, index, 0); }, 100);
     },
     handle_note_event(nodeIndex, velocity)
     {
          for(const key of this.keyboard.values())
          {
              if(nodeIndex === key.index)
              {
               
                if(velocity > 0)
                {
                    key.className = key.activeName
                }
                else
                {
                    key.className = key.inactiveName
                }
                return
              }
          }
     }
   },
    template: `
    <ul class="keys">
    <li v-for="key in keyboard" v-on:click="handle_click(key.index)" :class=key.className></li>
    </ul>
      `})
 
      function create_keyboard() {

        var result = []
        var key = 1;
        var octave = 0;
        for (let i = 1; i <= 88; i++) {
            if (i > 3 && i < 88) {
                key = (i - 4) % 12;
                octave = 1 + (i - 4) / 12;
            }
            if (i <= 3) {
                key = i + 8;
            }
            if (i == 88) {
                key = 0;
            }
            let className = mapKey(key);
            if (key == 1 || key == 3 || key == 6 || key == 8 || key == 10) {
                className = "black " + className;
            }
            else {
                className = "white " + className;
            }
       
            let index = i + 20
            className = className+" "+index
            result.push(
                {
                    index:index,
                    className: className,
                    inactiveName : className,
                    activeName: className+" note-on"
                }
            );
        }
        return result;
    }
    
    function mapKey(index) {
        switch (index) {
            case 0:
                return "c";
            case 1:
                return "c#";
            case 2:
                return "d";
            case 3:
                return "d#";
            case 4:
                return "e";
            case 5:
                return "f";
            case 6:
                return "f#";
            case 7:
                return "g";
            case 8:
                return "g#";
            case 9:
                return "a";
            case 10:
                return "a#";
            case 11:
                return "h";
        }
    }