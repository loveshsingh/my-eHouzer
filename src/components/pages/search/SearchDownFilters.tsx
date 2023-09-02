export const SearchDownFilters : React.FC<{}> = ():JSX.Element => {
    return (
        <>
            <div className="filterSec">
                <div className="container">
                    <div className="col-12">
                        <div className="sortsec">
                            <div className="possion-filter" id="extra_filter">
                                <ul>
                                    <li>
                                        <label className="pfilter">
                                            <input type="checkbox" name="extra_is_verified" value="1"/>
                                                <div className="pfilterTitle">Blox Verified</div>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="pfilter">
                                            <input type="checkbox" name="extra_is_exclusive" value="1"/>
                                                <div className="pfilterTitle">Blox Exclusive</div>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="pfilter">
                                            <input type="checkbox" name="extra_is_assured" value="1"/>
                                                <div className="pfilterTitle">Blox Assured</div>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="pfilter">
                                            <input type="checkbox" name="extra_fast_selling" value="1"/>
                                                <div className="pfilterTitle">Fast Selling</div>
                                        </label>
                                    </li>

                                    <li>
                                        <label className="pfilter">
                                            <input type="checkbox" name="extra_top_properties" value="1"/>
                                                <div className="pfilterTitle">Top Properties</div>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                           {/* <div className="mapView">

                                <div className="listView">
                                    <div className="title">Map View</div>
                                    <label className="switch">
                                        <input type="checkbox" id="checkbox" checked="{showmap}">
                                            <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>*/}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};
