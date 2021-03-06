<p align="center">
	<br>
	<img src="/.github/logo.png">
	<br><br>
	<a href="https://npm.im/vue-subslot"><img src="https://badgen.net/npm/v/vue-subslot"></a>
	<a href="https://npm.im/vue-subslot"><img src="https://badgen.net/npm/dm/vue-subslot"></a>
	<a href="https://bundlephobia.com/result?p=vue-subslot"><img src="https://badgen.net/bundlephobia/minzip/vue-subslot"></a>
	<br>
</p>

Pick out specific elements from the component `<slot>`.

```html
<template>
	<div class="header">
		<subslot element="h1" /> ⬅ Pick only the `h1` element from the default slot
	</div>
</template>
```

## 🚀 Install
```sh
npm i vue-subslot
```

## 🙋‍♂️ Why?
- **🔥 Cleaner Slot API** Give your users a cleaner and more readable API!
- **🧠 Full Slot control** Filter out and limit unwanted content from slots!
- **🐥 Tiny** `1.04 KB` minzipped!

## 👨🏻‍🏫 Examples
Have you ever developed a parent-child component set, and wanted to allow users to pass in the child-component without specifiying a slot but still have the same level of control as named-slots? With Subslot, you can!


<details>
    <summary>
        <strong>Demo 1:</strong> Inline filter attributes
        <a href="https://jsfiddle.net/hirokiosame/6fzeuh97/"><img align="center" src="https://img.shields.io/badge/JSFiddle-Open%20Demo-blue/?logo=jsfiddle&logoColor=lightblue"></a>
    </summary>

<br>

Imagine being able to offer the following API with parent-child components _Card_ and _CardHeader_.

```html
<card>
	<!-- The Card Header will be positioned separetely from the content -->
	<card-header>
		My special card
	</card-header>

	My card content
</card>
```

Using Subslot, this is all the code you need to make this possible. This is what _Card.vue_ looks like.

```html
<template>
	<div class="card">
		<div class="card-header">
			<!-- Pick out the Card Header from the default slot -->
			<subslot element="@CardHeader" limit="1" />
		</div>

		<div class="card-content">
			<!-- Use the remainder -->
			<subslot not element="@CardHeader" />
		</div>
	</div>
</template>

<script>
import Subslot from 'vue-subslot';
import CardHeader './CardHeader.vue';

export default {
	name: 'Card',

	components: {
		Subslot,
		CardHeader,
	}
};
</script>
```

</details>


<details>
    <summary>
        <strong>Demo 2:</strong> Named Subslots
        <a href="https://jsfiddle.net/hirokiosame/tcvp0r98/"><img align="center" src="https://img.shields.io/badge/JSFiddle-Open%20Demo-blue/?logo=jsfiddle&logoColor=lightblue"></a>
    </summary>

<br>

Alternatively to using inline filter attributes, you can define subslots on the component. With this approach, you can access subslots like you would normal slots but via `$subslots`. This is what _Card.vue_ would look like.

```html
<template>
	<div class="card">
		<div
			v-if="$subslots.cardHeader"
			class="card-header"
		 >
			<subslot name="cardHeader" />
		</div>

		<div class="card-content">
			<!-- Use the remainder -->
			<subslot />
		</div>
	</div>
</template>

<script>
import Subslot from 'vue-subslot';
import CardHeader './CardHeader.vue';

export default {
	name: 'Card',

	components: {
		Subslot,
		CardHeader,
	},

	mixins: [
		Subslot.define({
			// Use a string filter
			cardHeader: '@CardHeader:1', // Limit 1
			cardHeader: '@CardHeader[3:2]', // Offset 3, Limit 2

			// Or an object filter
			cardHeader: {
				element: '@CardHeader',
				limit: 1,
			},
		}),
	],
};
</script>
```

</details>

## 📖 API

#### Filter by element tag
As a string, it filters the vnodes by tag (as opposed to component)

```html
<subslot element="div" />
```

Filter the vnodes with tag `child-component`

```html
<subslot element="ChildComponent" />
```

#### To match a specific component
Use the `@` prefix to use the component from the `components` hash

```html
<subslot element="@ChildComponent" />
```

Or, pass in the direct Component reference

```html
<subslot :element="ChildComponent" />
```

#### To match multiple elements
Pass in an array

```html
<subslot :element="[ChildComponentA, '@ChildComponentB', 'div']" />
```

#### To match any element
Use the asterisk to match any element (incl. components). This can be used to filter out text/white-space.

```html
<subslot element="*" />
```

#### Offset the number of returned elements
```html
<subslot
	element="ChildComponent"
	offset="1"
/>
```

#### Limit the number of returned elements
```html
<subslot
	element="ChildComponent"
	offset="1"
	limit="1"
/>
```

#### Inverse the filter
Set the `not` boolean to inverse the filter and get everything that _doesn't_ match.

```html
<subslot not element="@ChildComponent" />
```

#### Text only
Inverse the element match-all to match only text nodes.

```html
<subslot not element="*" />
```

#### Slot fallback
Like normal slots, what you pass into the slot of `subslot` will be the fallback content of that `subslot`.

```html
<subslot name="banner">
	<default-banner />
</subslot>
```

## 📬 Events
- `@no-match`: Emitted when there are no matching vnodes


## ⚡ Advanced usage

### Pass in vnodes from a difference source
```html
<subslot
	:vnodes="$slots.namedSlot"
	element="@ChildComponent"
/>
```

## 💁‍♀️ FAQ

### Will this work for functional components passed into the slot?

Unfortunately not due to how functional components are implemented in Vue.js.

Functional components are stateless and are immediately invoked as a function that outputs vNodes. The outputted vNodes are passed into the slot in place of the functional component. Because Subslot doesn't actually receive the functional component, it's impossible to detect them.


## 👨‍👩‍👧 Related
- [vue-proxi](https://github.com/privatenumber/vue-proxi) - 💠 Tiny proxy component
- [vue-vnode-syringe](https://github.com/privatenumber/vue-vnode-syringe) - 🧬 Add attributes and event-listeners to `<slot>` content 💉
- [vue-pseudo-window](https://github.com/privatenumber/vue-pseudo-window) - 🖼 Declaratively interface window/document in your Vue template
- [vue-v](https://github.com/privatenumber/vue-v) - render vNodes via component template
- [vue-frag](https://github.com/privatenumber/vue-frag) - 🤲 Directive to return multiple root elements
