const { app } = require("electron");
const objects = require('./objects');







function userint_ToggleMarkerTimeline(state, dep, event) {
    // initialize dependencies 
    const {DOM, fileHandle, pathDep, basicFunctions} = dep;
    const file = event.target.dataset.markerDataFile;
    
        // init array that holds polylines (will update with more sophisticated structure later)
        const polyLineVerts = []

        // If already expanded, collapse and remove all instance markers
        if (state.markers[file].isExpanded) {
            let currentFileToRetract = fileHandle.getEntryInSimpleData(file);
            newPopupContent = DOM.leaf_buildPopupContent(currentFileToRetract, instance=false, buttonText="Show Timeline"); // rebuild main marker popup content to reflect collapsed state (e.g. remove instance-specific timestamp info)            
            document.getElementById("mapPopupButton").innerText = "Show Timeline";
            state.markers[file].marker.setPopupContent(newPopupContent);            
            
            DOM.leaf_removeMapMarker(state, file, instance=true);
            state.markers[file].isExpanded = false; // set marker state to not expanded
            state.markers[file].expandedInstances = []; // clear expanded instances array
            state.markers[file].additionalInstances.polyLines = [];
            state.markers[file].additionalInstances.Numbers = [];
            state.markers[file].additionalInstances.UnderIceFlags = [];
            state.markers[file].TimestampFlags.TimestampFlagDifferences = [];

        // in not, expand and add instance markers for each additional coordinate pair
        } else {
            let currentFileToExpand = fileHandle.getEntryInSimpleData(file);
            newPopupContent = DOM.leaf_buildPopupContent(currentFileToExpand, instance=false, buttonText="Hide Timeline"); // rebuild main marker popup content to reflect expanded state (e.g. remove instance-specific timestamp info)            
            document.getElementById("mapPopupButton").innerText = "Hide Timeline";
            state.markers[file].marker.setPopupContent(newPopupContent);
            
            // Add first coordinate pair to polyline vertices
            polyLineVerts.push([currentFileToExpand.coords[0].lat, currentFileToExpand.coords[0].lon]);
            for (coordPair in currentFileToExpand.coords) {
                if (coordPair == 0) continue; // skip first coord pair since it's already represented by the main marker and we want to avoid duplicate markers and popups for the first instance

                // current coord pair instance
                latNlon = [currentFileToExpand.coords[coordPair].lat, currentFileToExpand.coords[coordPair].lon];
                let previousCoordPair = [currentFileToExpand.coords[coordPair-1].lat, currentFileToExpand.coords[coordPair-1].lon];
                let currentCoordPair = latNlon;

                // polyline instance
                let polyLineInstance = DOM.leaf_addPolyLineToMap(state, currentFileToExpand.fileName, previousCoordPair, currentCoordPair);
                
                // marker instance
                let instancePopupContent = DOM.leaf_buildPopupContent(currentFileToExpand, instance=coordPair);
                DOM.leaf_insertDataMarker(state, ModuleDependencies["DOM"], latNlon[0], latNlon[1], instancePopupContent, {}, currentFileToExpand.fileName, instance=true);
                state.markers[file].isExpanded = true; // set marker state to expanded
                
                // instance number
                DOM.leaf_addPolyNumberToMap(state, file, latNlon, coordPair);

                //underIceFlags
                let a = currentFileToExpand.timestamps["ms"][coordPair]
                let aform = currentFileToExpand.timestamps["formatted"][coordPair]
                let b = currentFileToExpand.timestamps["ms"][coordPair - 1]
                let bform = currentFileToExpand.timestamps["formatted"][coordPair - 1]
                let c = a - b
                const days = c / (1000 * 1000 * 1000 * 60 * 60 * 24)

                let timestampInstancesDiff = basicFunctions.getTimestampDifference(a, b, importFormat="ms", returnType=objects.GraphType.d);
                
                if (timestampInstancesDiff > 5) { // default to 200 for debugging, 
                    state.markers[file].TimestampFlags.TimestampFlagDifferences.push(timestampInstancesDiff);
                    polyLineInstance.setStyle({ color: 'red' });
                    
                    let instancePopupContent = DOM.leaf_buildPopupContent(currentFileToExpand, instance=true, buttonText=null, manual=`
                        <h4>Under Ice Flag</h4>
                        <p><span class="cRed bold">This platforms deployment might have gone under ice</span></p>
                        <br>
                        <p><span class="cRed bold">${Number(timestampInstancesDiff).toFixed(2)}</span> days Elapsed between timestamp <span class="cBlue bold">[${coordPair-1}] (${bform})</span> and timestamp <span class="cBlue bold">[${coordPair}] (${aform})</span>.</p>
                    `);
                    if (
                    typeof latNlon[0] === 'number' && !isNaN(latNlon[0]) &&
                    typeof latNlon[1] === 'number' && !isNaN(latNlon[1])
                    ) {
                    
                    let InbetweenCoords = basicFunctions.getInbetweenCoords(previousCoordPair, currentCoordPair, .5);
                    let FlagInstance = DOM.leaf_insertDataMarker(state, ModuleDependencies["DOM"], InbetweenCoords.lat, InbetweenCoords.lon, instancePopupContent, {}, currentFileToExpand.fileName, instance=true, customImage="timeFlag.png");
                    //state.markers[file].additionalInstances.UnderIceFlags.push(FlagInstance); 
                    } else {
                    console.error('Invalid coordinates:', latNlon);
                    }
                } else {
                    state.markers[file].TimestampFlags.TimestampFlagDifferences.push(NaN);
                }
            }
        }
}

function userint_focusOnMarker(state) {
        if (Array.from(state.selectedFiles).length === 0){
        console.warn('No file selected, cannot focus marker');
        return;
    } else {
        let focusedFile = null;

        if(state.isMultiSelect){
            focusedFile = Array.from(state.allFiles)[state.currentFileIndexTarget];
        } else {
            focusedFile = Array.from(state.selectedFiles)[0];
        }

        console.log(state.currentFileIndexTarget);    
        console.log(focusedFile); 

        focusedEntry = fileHandle.getEntryInSimpleData(focusedFile);
        focusedEntryCoords = focusedEntry.coords[0];
        let lat = focusedEntryCoords.lat;
        let lon = focusedEntryCoords.lon;
        let zoomLevel = 6;
        
        //state.map.setView([lat, lon], zoomLevel);
        state.map.panTo([lat, lon]);
    }

    
}

module.exports = {
    userint_ToggleMarkerTimeline,
    userint_focusOnMarker
};