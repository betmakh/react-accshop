import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

 const TankPreview = ({tank}) => {

	return (<div className="col-md-2 col-sm-3 col-xs-4" title={`battles: ${tank.statistics.battles}, wins: ${tank.statistics.wins}`}>
            	<img src={tank.image ? tank.image : '/public/images/noimage.png'} alt="Tank image" />
                <h6 className="text-center">
                {`${tank.name_i18n} (${tank.nation_i18n})`}
	            </h6>
          </div>);
}

export default TankPreview;