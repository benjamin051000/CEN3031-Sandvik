import React from 'react'
import { Tab } from 'semantic-ui-react'
import { Field, ErrorMessage } from 'formik';

const panes = [
    {
        menuItem: 'Client Information', render: () =>
            <Tab.Pane style={{ backgroundColor: "#272727", border: "5px solid #009aff" }}>
                <h1 className="calculator-section-header">Client Information</h1>
                <div className="input-grid">
                    <p>
                        <label htmlFor="projName">Project Name</label>
                        <Field name="projName" type="text" placeholder="Name of Project" />
                        <ErrorMessage component="required-message" name="projName" />
                    </p>
                    <p>
                        <label htmlFor="custName">Customer Name</label>
                        <Field name="custName" type="text" placeholder="First and Last Name" />
                        <ErrorMessage component="required-message" name="custName" />
                    </p>
                    <p>
                        <label  htmlFor="companyName">Company Name</label>
                        <Field name="companyName" type="text" placeholder="Name of Project" />
                        <ErrorMessage component="required-message" name="companyName" />
                    </p>
                    <p>
                        <label htmlFor="date" >Date</label>
                        <Field name="date" type="text" placeholder="MM/DD/YY" />
                        <ErrorMessage component="required-message" name="date" />
                    </p>
                </div>
            </Tab.Pane>
    },
    {
        menuItem: 'Site Conditions', render: () =>
            <Tab.Pane style={{ backgroundColor: "#272727", border: "5px solid #009aff" }}>
                <h1 className="calculator-section-header">Site Conditions</h1>
                <div className="input-grid">
                    <p>
                        <label htmlFor="ucs">Rock UCS</label>
                        <Field name="ucs" type="text" placeholder="In units" />
                        <ErrorMessage component="required-message" name="ucs" />
                    </p>
                    <p>
                        <label  htmlFor="fracturization">Fracturization</label>
                        <Field class="ui selection dropdown" style={{ padding: "6px" }} name="fracturization" as="select">
                            {['None', 'Light', 'Moderate', 'Heavy'].map(
                                e => <option>{e}</option>
                            )}
                        </Field>
                        <ErrorMessage component="required-message" name="fracturization" />
                    </p>

                    <p>
                        <label htmlFor="elevation">Elevation</label>
                        <Field name="elevation" type="text" placeholder="Feet" />
                        <ErrorMessage component="required-message" name="elevation" />
                    </p>
                    <p>
                        <label htmlFor="temp">Ambient Temperature</label>
                        <Field name="temp" type="text" placeholder="Degrees in F°" />
                        <ErrorMessage component="required-message" name="temp" />
                    </p>
                    <p>
                        <label htmlFor="fuelCost">Fuel Cost</label>
                        <Field name="fuelCost" type="text" placeholder="In USD" />
                        <ErrorMessage component="required-message" name="fuelCost" />
                    </p>
                    <p>
                        <label htmlFor="estHours">Estimated Hours</label>
                        <Field name="estHours" type="text" placeholder="Hours" />
                        <ErrorMessage component="required-message" name="estHours" />
                    </p>
                    <p>
                        <label htmlFor="carbTaxTonne">Carbon Tax</label>
                        <Field name="carbTaxTonne" type="text" placeholder="$/Tonne" />
                        <ErrorMessage component="required-message" name="carbTaxTonne" />
                    </p>
                    <p>
                        <label htmlFor="drillTimePercent">Drill Time</label>
                        <Field name="drillTimePercent" type="text" placeholder="Time %" />
                        <ErrorMessage component="required-message" name="drillTimePercent" />
                    </p>
                    <p>
                        <label htmlFor="fuelTankSize">Fuel Tank Size</label>
                        <Field name="fuelTankSize" type="text" placeholder="Gallons" />
                        <ErrorMessage component="required-message" name="fuelTankSize" />
                    </p>
                    <p>
                        <label htmlFor="engineRebuildCost">Engine Rebuild Cost</label>
                        <Field name="engineRebuildCost" type="text" placeholder="Price in USD" />
                        <ErrorMessage component="required-message" name="engineRebuildCost" />
                    </p>
                    <p>
                        <label htmlFor="compRebuildCost">Compressor Rebuild Cost</label>
                        <Field name="compRebuildCost" type="text" placeholder="Price in USD" />
                        <ErrorMessage component="required-message" name="compRebuildCost" />
                    </p>

                </div>
            </Tab.Pane  >
    },
    {
        menuItem: 'Rig Specifications', render: () =>
            <Tab.Pane style={{ backgroundColor: "#272727", border: "5px solid #009aff" }}>
                <h1 className="calculator-section-header">Rig Specifications</h1>
                <div className="input-grid">
                    <p>
                        <label htmlFor="pipeSize">Pipe Size</label>
                        <Field name="pipeSize" type="text" placeholder="Diameter of Pipe" />
                        <ErrorMessage component="required-message" name="pipeSize" />
                    </p>

                    <p>
                        <label htmlFor="holeDepth">Hole Depth</label>
                        <Field name="holeDepth" type="text" placeholder="Depth in Feet" />
                        <ErrorMessage component="required-message" name="holeDepth" />
                    </p>
                </div>


            </Tab.Pane>
    },
    {
        menuItem: 'DTH', render: () =>
            <Tab.Pane style={{ backgroundColor: "#272727", border: "5px solid #009aff" }}>
                <h1 className="calculator-section-header">DTH</h1>
                <div className="input-grid">
                    <p>
                        <label htmlFor="dthComp">Compressor</label>
                        <Field name="dthComp" type="text" placeholder="Compressor" />
                        <ErrorMessage component="required-message" name="dthComp" />
                    </p>

                    <p>
                        <label htmlFor="dthWap">WAP</label>
                        <Field name="dthWap" type="text" placeholder="WAP" />
                        <ErrorMessage component="required-message" name="dthWap" />
                    </p>

                    <p>
                        <label htmlFor="dthHammer">Hammer</label>
                        <Field name="dthHammer" type="text" placeholder="Hammer Type" />
                        <ErrorMessage component="required-message" name="dthHammer" />
                    </p>

                    <p>
                        <label htmlFor="dthBit">Bit</label>
                        <Field name="dthBit" type="text" placeholder="Drill Bit" />
                        <ErrorMessage component="required-message" name="dthBit" />
                    </p>
                    <p>
                        <label htmlFor="rockDRI">Rock DRI</label>
                        <Field name="rockDRI" type="text" placeholder="Rock DRI" />
                        <ErrorMessage component="required-message" name="rockDRI" />
                    </p>
                </div>


            </Tab.Pane>
    },
    {
        menuItem: 'Rotary', render: () =>
            <Tab.Pane style={{ backgroundColor: "#272727", border: "5px solid #009aff" }}>
                <h1 className="calculator-section-header">Rotary</h1>
                <div className="input-grid">
                    <p>
                        <label htmlFor="rotPulldown">Pulldown</label>
                        <Field name="rotPulldown" type="text" placeholder="Pull Down" />
                        <ErrorMessage component="required-message" name="rotPulldown" />
                    </p>
                    <p>
                        <label htmlFor="rotComp">Compressor</label>
                        <Field name="rotComp" type="text" placeholder="Compressor Type" />
                        <ErrorMessage component="required-message" name="rotComp" />
                    </p>
                    <p>
                        <label htmlFor="rotBit">Bit</label>
                        <Field name="rotBit" type="text" placeholder="Rotary Bit" />
                        <ErrorMessage component="required-message" name="rotBit" />
                    </p>
                    <p>
                        {/* TODO: Consider a tooltip that says "Revolutions per minute" or additional info */}
                        <label htmlFor="rotRpm">RPM</label>
                        <Field name="rotRpm" type="text" placeholder="Rotations per Minute" />
                        <ErrorMessage component="required-message" name="rotRpm" />
                    </p>
                </div>

            </Tab.Pane>
    },
]

const InputTabs = () => (
    <Tab menu={{ fluid: true, tabular: true, inverted: true, color: "blue" }} panes={panes} />
)

export default InputTabs