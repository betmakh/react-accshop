import React from 'react';
import renderer from 'react-test-renderer';

import AccountDetails from '../src/components/AccountDetails.jsx';

test('Account details renders normal', () => {
	const component = renderer.create(
		<AccountDetails
			account={{
				user: { email: '6etmah@gmail.com1' },
				_id: '123DASDASD',
				title: 'title',
				description: 'description',
				price: 123,
				acc_id: 123123123,
				statistic: { battles: 228 }
			}}
		/>
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
