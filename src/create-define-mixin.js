import arrRemove from './utils/arr-remove';
import filterVnodes from './utils/filter-vnodes';

const arrayPtrn = /(.+)\[(\d?)(?::(\d+))?]$/;
const parseFilterString = stringFilter => {
	let not = false;
	let element;
	let offset = 0;
	let limit;

	if (arrayPtrn.test(stringFilter)) {
		stringFilter = stringFilter.replace(arrayPtrn, (_, _element, _offset, _limit) => {
			element = _element;
			if (_offset) {
				offset = _offset;
			}

			if (_limit) {
				limit = _limit;
			}

			return '';
		});
	} else {
		const filterSplit = stringFilter.split(':');
		element = filterSplit[0];
		limit = filterSplit[1];
	}

	if (element[0] === '!') {
		not = true;
		element = element.slice(1);
	}

	element = element.split(',');

	return {
		element, offset, limit, not,
	};
};

const genSubSlots = ({sslotDef, vnodes, vm}) => {
	if (!vnodes) {
		return {};
	}

	const slots = {
		default: vnodes.slice(0),
		// _original: vnodes,
	};

	Object.entries(sslotDef).forEach(([name, def]) => {
		const filtered = filterVnodes({
			filter: typeof def === 'string' ? parseFilterString(def) : def,
			vnodes,
			vm,
		});

		filtered.forEach(vn => arrRemove(slots.default, vn));

		if (filtered.length > 0) {
			slots[name] = filtered;
		}
	});

	return slots;
};

export default function createDefineMixin(sslotDef) {
	function generateSubslots() {
		this.$subslots = genSubSlots({
			sslotDef,
			vnodes: this.$slots.default,
			vm: this,
		});
	}

	return {
		created: generateSubslots,
		beforeUpdate: generateSubslots,
	};
}
