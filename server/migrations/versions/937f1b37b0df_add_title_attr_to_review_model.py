"""Add title attr to review model

Revision ID: 937f1b37b0df
Revises: e33d97e568e3
Create Date: 2024-09-01 20:11:57.828587

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '937f1b37b0df'
down_revision = 'e33d97e568e3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_column('title')

    # ### end Alembic commands ###