from app.models import db, Instruction


# Adds a demo user, you can add other users here if you want
def seed_instructions():
    in1 = Instruction(
        list_order = 1,
        specification  = 'Put the sourdough starter in a large bowl and mix in 350ml tepid water. Whisk thoroughly using a balloon whisk. Add 500ml strong white bread flour all at once, then mix quickly to form a scrappy, soft dough. Add a little extra water if it seems too dry. At this stage, it doesn\'t matter how smooth the dough is - just make sure there are no dry patches of flour. Leave the dough to rest for 30 minutes to help the flour to absorb all the liquid - this will make kneading easier. Mix the salt with 25ml tepid water and add this to the dough. Mix it in by folding the sides of the dough into the middle. Keep turning the bowl, folding the sides of the dough into the middle until mixed; do this for about 30 seconds. Rest the dough again for 10 minutes. Fold the dough in the bowl again. If the dough sticks to your hand, dampen your hand. Rest the dough for 10 minutes.',
        recipe_id = 1
        )
    in2 = Instruction(
        list_order = 2,
        specification  = 'Repeat the folding and resting 8 times. It seems like a lot of work but each folding only takes 30 seconds. After the final fold, the dough should be noticeably smoother and elastic.',
        recipe_id = 1
        )
    in3 = Instruction(
        list_order = 3,
        specification  = 'Cover the bowl with oiled cling film and leave to rise until doubled in size - about 2 hours at room temperature or overnight in the fridge',
        recipe_id = 1
        )
    in4 = Instruction(
        list_order = 4,
        specification  = 'Lightly flour the work surface. Using a dough scraper or your hands, turn the dough out onto the work surface, trying not to knock out too much air.',
        recipe_id = 1
        )
    in5 = Instruction(
        list_order = 5,
        specification  = 'Gently shape the dough into a rough rectangle. Fold the top of the dough down to the middle and the bottom over it, like a business letter. Then fold the left side in and the right side over it. Flip the loaf over so the folds are underneath, lightly cover with oiled cling film and rest for 20 minutes. Turn the dough smooth-side down again onto a lightly floured surface and repeat the folding process. Flip again so the folds are underneath',
        recipe_id = 1
        )
    in6 = Instruction(
        list_order = 6,
        specification  = 'Line a bowl with a clean tea towel and flour generously (or use a proving basket, flouring it well, as in the picture). Put in the dough, smooth-side down, cover with oiled cling film and leave to prove until doubled in size and a finger inserted at the edge leaves an indentation. It may take up to 4 hours at room temperature or overnight in the fridge.',
        recipe_id = 1
        )
    in7 = Instruction(
        list_order = 7,
        specification  = 'Half an hour before baking, heat the oven to 225°C/205°C fan/gas 7½. Put a roasting tin in the bottom of the oven and lightly flour a baking sheet. When the dough is ready to bake, pour 500ml boiling water into the roasting tin in the oven (the steam helps give the loaf a good rise and crunchy crust). Carefully remove the cling film and invert the dough onto the baking sheet. Immediately, using a sharp knife, score a pattern on top of the bread.',
        recipe_id = 1
        )
    in8 = Instruction(
        list_order = 8,
        specification  = 'Open the oven door, being careful of the steam. Slide the baking sheet onto the upper middle shelf, close the door and bake for 25-30 minutes. After 15 minutes, turn the bread around so it colours evenly. When cooked it will be risen, deep brown and, if you tap on the base, should sound hollow. If it needs a little more baking, turn the oven down to 180°C/160°C fan/gas 4 until cooked. Cool completely on a wire rack before slicing.',
        recipe_id = 1
        )

    in9 = Instruction(
        list_order = 1,
        specification  = 'Put the sourdough starter in a large bowl and mix in 350ml tepid water. Whisk thoroughly using a balloon whisk. Add 500ml strong white bread flour all at once, then mix quickly to form a scrappy, soft dough. Add a little extra water if it seems too dry. At this stage, it doesn\'t matter how smooth the dough is - just make sure there are no dry patches of flour. Leave the dough to rest for 30 minutes to help the flour to absorb all the liquid - this will make kneading easier. Mix the salt with 25ml tepid water and add this to the dough. Mix it in by folding the sides of the dough into the middle. Keep turning the bowl, folding the sides of the dough into the middle until mixed; do this for about 30 seconds. Rest the dough again for 10 minutes. Fold the dough in the bowl again. If the dough sticks to your hand, dampen your hand. Rest the dough for 10 minutes.',
        recipe_id = 2
        )
    in10 = Instruction(
        list_order = 2,
        specification  = 'Repeat the folding and resting 8 times. It seems like a lot of work but each folding only takes 30 seconds. After the final fold, the dough should be noticeably smoother and elastic.',
        recipe_id = 2
        )
    in11 = Instruction(
        list_order = 3,
        specification  = 'Cover the bowl with oiled cling film and leave to rise until doubled in size - about 2 hours at room temperature or overnight in the fridge',
        recipe_id = 2
        )
    in12 = Instruction(
        list_order = 4,
        specification  = 'Lightly flour the work surface. Using a dough scraper or your hands, turn the dough out onto the work surface, trying not to knock out too much air.',
        recipe_id = 2
        )
    in13 = Instruction(
        list_order = 5,
        specification  = 'Gently shape the dough into a rough rectangle. Fold the top of the dough down to the middle and the bottom over it, like a business letter. Then fold the left side in and the right side over it. Flip the loaf over so the folds are underneath, lightly cover with oiled cling film and rest for 20 minutes. Turn the dough smooth-side down again onto a lightly floured surface and repeat the folding process. Flip again so the folds are underneath',
        recipe_id = 2
        )
    in14 = Instruction(
        list_order = 6,
        specification  = 'Line a bowl with a clean tea towel and flour generously (or use a proving basket, flouring it well, as in the picture). Put in the dough, smooth-side down, cover with oiled cling film and leave to prove until doubled in size and a finger inserted at the edge leaves an indentation. It may take up to 4 hours at room temperature or overnight in the fridge.',
        recipe_id = 2
        )
    in15 = Instruction(
        list_order = 7,
        specification  = 'Half an hour before baking, heat the oven to 225°C/205°C fan/gas 7½. Put a roasting tin in the bottom of the oven and lightly flour a baking sheet. When the dough is ready to bake, pour 500ml boiling water into the roasting tin in the oven (the steam helps give the loaf a good rise and crunchy crust). Carefully remove the cling film and invert the dough onto the baking sheet. Immediately, using a sharp knife, score a pattern on top of the bread.',
        recipe_id = 2
        )
    in16 = Instruction(
        list_order = 8,
        specification  = 'Open the oven door, being careful of the steam. Slide the baking sheet onto the upper middle shelf, close the door and bake for 25-30 minutes. After 15 minutes, turn the bread around so it colours evenly. When cooked it will be risen, deep brown and, if you tap on the base, should sound hollow. If it needs a little more baking, turn the oven down to 180°C/160°C fan/gas 4 until cooked. Cool completely on a wire rack before slicing.',
        recipe_id = 2
        )

    db.session.add(in1)
    db.session.add(in2)
    db.session.add(in3)
    db.session.add(in4)
    db.session.add(in5)
    db.session.add(in6)
    db.session.add(in7)
    db.session.add(in8)
    db.session.add(in9)
    db.session.add(in10)
    db.session.add(in11)
    db.session.add(in12)
    db.session.add(in13)
    db.session.add(in14)
    db.session.add(in15)
    db.session.add(in16)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_instructions():
    db.session.execute('TRUNCATE instructions RESTART IDENTITY CASCADE;')
    db.session.commit()
