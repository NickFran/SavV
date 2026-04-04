// GSO-SPF
// Graduate School of Oceanography - Simple Popup Framework

class popup {
    constructor(init = {}, basics = {}, functionality = {}, options = {}) {
        this.type = init.type;
        this.parent = init.parent || document.body || document.documentElement;
        this.notificationType = init.notificationType || null; // e.g. "info", "warning", "error"

        this.title = basics.title || "Popup Title";
        this.content = basics.content || "<p>Popup Content</p>";

        this.onOpen = functionality.onOpen || function() {};
        this.onClose = functionality.onClose || function() {};
        this.onOpen_FirstTime = functionality.onOpen_FirstTime || function() {};

        this.isFullscreen = options.isFullscreen || true;
        this.debug = options.debug || false;
        this.width = options.width || "70%";
        this.height = options.height || "80%";

        this.hasOpened = false;
        this.#init();
    }

    #init() {

        if(this.type === null){
            console.error(`
                Popup type is null. Please provide a valid type.
                Available types: ${popupTypes.join(", ")}
            `);
            return;
        }

        // Create the main popup box
        const popupBox = document.createElement("div");
        popupBox.classList.add("popup-box");
        if (this.isFullscreen) {
            popupBox.classList.add("fullscreen");
        }
        
        popupBox.style.width = this.width;
        popupBox.style.height = this.height;

        const icon = document.createElement("span");
        if(this.notificationType !== null){
            switch(this.notificationType){
                case "info":
                    //icon.style.backgroundColor = "blue";
                    icon.classList.add("icon", "icon-circle-notif");
                    break;
                case "warning":
                    //icon.style.backgroundColor = "orange";
                    icon.classList.add("icon", "icon-triangle-caution");
                    break;
                case "error":
                    //icon.style.backgroundColor = "red";
                    icon.classList.add("icon", "icon-stop-caution");
                    break;
            }
        }
        

        // Create the overlay
        const overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");

        // Create the header
        const header = document.createElement("div");
        header.classList.add("popup-header");

        // Create the title
        const title = document.createElement("h2");
        title.classList.add("popup-title");
        title.textContent = this.title;

        // Create the content container
        const content = document.createElement("div");
        content.classList.add("popup-content");
        content.innerHTML = this.content; // Assuming content is HTML string. If it's plain text, use textContent instead.

        // Create the close button
        const closeBtn = document.createElement("button");
        closeBtn.classList.add("popup-close");
        closeBtn.textContent = "X";

        closeBtn.addEventListener("click", () => {
            this.close();
        });

        // Assemble the tree
        header.appendChild(icon);
        header.appendChild(title);
        header.appendChild(closeBtn);
        popupBox.appendChild(header);
        popupBox.appendChild(content);

        // Now popupBox contains your full structure and can be added to the DOM
        this.popupBox = popupBox;
        this.overlay = overlay;

        this.popupBox.style.display = "none";
        this.overlay.style.display = "none";
        this.parent.appendChild(this.overlay);
        this.parent.appendChild(this.popupBox);
    }

    open() {
        this.overlay.style.display = 'block';
        this.popupBox.style.display = 'block';
        this.onOpen();
        if (!this.hasOpened) {
            this.onOpen_FirstTime();
        }

        this.hasOpened = true;
    }

    close() {
        this.overlay.style.display = 'none';
        this.popupBox.style.display = 'none';
        this.onClose();
    }

    delete() {
        if (this.popupBox.parentNode) {
            this.popupBox.parentNode.removeChild(this.popupBox);
        }
    }
}


const popupTypes = [
    "simple",
    "menu",
]

const notificationTypes = [
    "info",
    "warning",
    "error"
]

const popupTemplates = {
    "Spawn_noFilesToFilter": function() {
        return new popup(
            {
                type: "simple",
                notificationType: "info",
            },
            {
                title: "No Files To Filter",
                content: "No files available to filter, please import some data first.",
            },
            {
                onClose: function() {
                    console.log("No files to filter popup closed.");
                }
            },
            {
                isFullscreen: false,
                width: "20%",
                height: "30%"

            }
        );
    }
}
module.exports = { 
    popup, 
    popupTypes, 
    popupTemplates, 
    notificationTypes 
};