import React from 'react';
import renderer from 'react-test-renderer';

import AccountDetails from '../src/components/AccountDetails.jsx';

test('Account details renders normal', () => {
	const component = renderer.create(
		<AccountDetails
			account={{
				user: { email: '6etmah@gmail.com' },
				_id: '123123asd',
				title: 'title',
				description: 'description',
				price: '12$',
				acc_id: '123DASDASD',
				statistic: { battles: 228 }
			}}
		/>
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
