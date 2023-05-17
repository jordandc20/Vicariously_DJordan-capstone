"""add location deets

Revision ID: 7b55bb4d5cd5
Revises: 1ab46c74938d
Create Date: 2023-05-16 12:38:50.367732

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7b55bb4d5cd5'
down_revision = '1ab46c74938d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('locations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rating', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('notes', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('google_map_url', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('website_url', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('avg_cost', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(batch_op.f('fk_locations_user_id_users'), 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('locations', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_locations_user_id_users'), type_='foreignkey')
        batch_op.drop_column('user_id')
        batch_op.drop_column('avg_cost')
        batch_op.drop_column('website_url')
        batch_op.drop_column('google_map_url')
        batch_op.drop_column('notes')
        batch_op.drop_column('rating')

    # ### end Alembic commands ###