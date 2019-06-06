<template>
  <div class="button-container" id="dragzone" :class="{ dragged: dragged, error: mode == 'error', success: mode == 'success' }">
    <div class="button-image vfx">
      <transition name="fadeup" mode="out-in">
        <div class="success"  v-if="mode == 'success'" key="success">something</div>
        <div class="error"    v-if="mode == 'error'" key="error">{{errorMessage}}</div>
        <div class="drop"     v-if="mode == 'default'" key="default">Drop assetbundle files</div>
      </transition>
    </div>
    <div class="text">Unity VFX Importer</div>
  </div>
</template>

<script>
const { remote } = require('electron')
var fs = require('fs');

export default {
  name: 'dragZone',

  data () {
    return {
      dragged: false,
      mode: 'default', //can also be 'error' or 'success'
      errorMessage: ''
    }
  },

  mounted: function() {
    var holder = document.getElementById('dragzone');
    holder.ondragover = (e)=> {
      this.dragged = true;
      e.dataTransfer.dropEffect = 'copy';
      return false;
    };
    holder.ondragleave = ()=> {
      this.dragged = false;
      return false;
    };
    holder.ondragend = ()=> {
      this.dragged = false;
      return false;
    };
    holder.ondrop = (e)=> {
      this.parseDrop(e).then(()=> {
        this.mode = 'success';
      }).catch((err)=>{
        this.mode = 'error';
        this.errorMessage  = err
      });
      this.dragged = false;
      e.preventDefault();
      return false;
    };
  },

  methods: {
    parseDrop: function(e) {
      return new Promise((resolve, reject) => {
        let dropIsOk    = true;
        let filesToCopy = [];
        const documentsPath = remote.app.getPath('documents') + '\\Depthcast\\AssetBundles';

        for (let f of e.dataTransfer.files) {
          //assetbundles cant have extensions (assetbundles dont have extensions)
          //path cant be documentsPath (windows bug where file gets overwritten if copy is same path)
          //path cant be a folder (folders are always multiple of 4096)
          if (f.type != "" || f.path.includes(documentsPath) || f.size%4096 == 0) {
            dropIsOk = false;
          } else {
            filesToCopy.push({name: f.name, path: f.path});
          }
        }

        if (dropIsOk) {
          try {
            //check if documents path exists
            fs.statSync(documentsPath);
            //start copying files into Documents
            for (let f of filesToCopy) {
              const reader = fs.createReadStream(f.path);
              const writer = fs.createWriteStream(documentsPath + '\\' + f.name);
              reader.pipe(writer);
            }
            //success message
            resolve()
          } catch (err) {
            //documents dont exist yet
            if (err.code === 'ENOENT') {
              reject('Open Designer one time first')
            }
          }
        } else {
          //drop wasnt ok for above reasons -- give generic error
          reject('Invalid file type')
        }
      })
    }
  }
}
</script>
